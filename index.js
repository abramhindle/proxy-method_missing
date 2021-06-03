class Example {
    a$number$number(x,y) {
	return x + y
    }
    a$string$number(s,n) {
	return [...Array(n)].map(() => s).join("")
    }
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
    props = prop.toString();
    if (props in target) {
        return Reflect.get(target,prop,receiver);
    }
    target[props] = makeSimpleMultiMethod(prop);
    return Reflect.get(target, prop, receiver);
}
function makeHandler() {
    return {
	get: handlerGet
    }
}
// We can wrap it with proxy
pe = new Proxy(new Example(),makeHandler());
console.log( "pe.a(1,2)    "     ,       pe.a(1,2)    );
console.log( "pe.a(\"x\",5)  "   ,       pe.a("x",5)  );
try {
    console.log( "pe.a(\"x\",\"x\")" ,       pe.a("x","x"));
} catch (err) {
    console.log("Error "+err);
}
// We can forget proxy and just make the method a multi method by default
Example.prototype.a = makeSimpleMultiMethod("a");
e = new Example();
console.log( "e.a(1,2)    "     ,       e.a(1,2)    );
console.log( "e.a(\"x\",5)  "   ,       e.a("x",5)  );
try {
    console.log( "e.a(\"x\",\"x\")" ,       e.a("x","x"));
} catch (err) {
    console.log("Error "+err);
}

