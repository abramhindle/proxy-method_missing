class Example {
	a$number$number(x,y) {
		return x + y
	}
	a$string$number(s,n) {
		return [...Array(n)].map(() => s).join("")
	}
	// a() {
	// 	let prefix = "a_";	
	// 	let sig = prefix + [...arguments].map(x => typeof(x)).join("_");
	// 	return this[sig](...arguments);
	// }
}
function argsMatchDef(def, args) {

}
function makeSimpleMultiMethod(prefix) {
	return function() {
		let sig = prefix + "$" + [...arguments].map(x => typeof(x)).join("$");
		if (sig in this) {
			return this[sig](...arguments);
		} else {
			throw (sig + ' not in ' + this)
		}
	}
}

function handlerGet(target, prop, receiver) {
	if (prop in target) {
		return Reflect.get(...arguments);
	}
	target[prop] = makeSimpleMultiMethod(prop);
	return Reflect.get(...arguments);
}
function makeHandler() {
	return {
		get: handlerGet
	}
}
pe = new Proxy(new Example(),makeHandler());
pe.a(1,2)
pe.a("x",5)
pe.a("x","x")
Example.prototype.a = makeSimpleMultiMethod("a")
e = new Example()
e.a(1,2)
e.a("x",5)
e.a("x","x")

