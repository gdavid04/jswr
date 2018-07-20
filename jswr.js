// JSWR by GDavid
// Copyrgiht (C) 2018

Number.prototype.nearestShift = function() {
    var n = this;
    var m = n;
    for(var i = 0; m > 1; i++) {
      m = m >>> 1;
    }
    if (n & 1 << i-1 && 1 << i+1 <= Number.MAX_SAFE_INTEGER) { i++; }
    return i;
}

Array.prototype.closestTo = function (num) {
    var arr = this;
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}

var weirdUndefined = '[][+[]]';

Boolean.prototype.toWeird = function() {
    return {
        true: '!![]',
        false: '![]'
    }[this];
}

var weirdNaN = '+{}';
var weirdInfinity = '+!![]/[]';
var weirdMinusInfinity = '-!![]/[]';

Number.prototype.toWeird = function() {
    if (this != Math.round(this)) {
        throw 'Not implemented';
    } else if (this == Infinity) {
        return weirdInfinity;
    } else if (this == -Infinity) {
        return weirdMinusInfinity;
    } else if (this == 0) {
        return '+[]';
    } else if (this == 1) {
        return '+!![]';
    } else if (this == 2) {
        return '+!![]+!![]';
    } else if (this > 0) {
        var nearestShift = this.nearestShift();
        var nearestPow2 = 1 << nearestShift;
        var res;
        try {
            if (nearestPow2 == this) {
                res = '+!![]<<(' + nearestShift.toWeird() + ')';
            } else if (nearestPow2 < this) {
                res = '(+!![]<<(' + nearestShift.toWeird() + '))+(' + (this - nearestPow2).toWeird() + ')';
            } else {
                res = '(+!![]<<(' + nearestShift.toWeird() + '))-(' + (nearestPow2 - this).toWeird() + ')';
            }
        } catch (e) {
            throw 'Stack overflow, maybe the number is too big';
        }
        if (eval(res) == this) {
            return res;
        } else {
            throw 'Can\'t represent number, maybe it\'s too big';
        }
    } else if (this < 0) {
        return '-(' + (-this).toWeird() + ')';
    } else {
        throw 'Not implemented';
    }
}

var weirdChars = {
    'f': `([]+${false.toWeird()})[${(0).toWeird()}]`,
    'a': `([]+${false.toWeird()})[${(1).toWeird()}]`,
    'l': `([]+${false.toWeird()})[${(2).toWeird()}]`,
    's': `([]+${false.toWeird()})[${(3).toWeird()}]`,
    'e': `([]+${false.toWeird()})[${(4).toWeird()}]`,
    't': `([]+${true.toWeird()})[${(0).toWeird()}]`,
    'r': `([]+${true.toWeird()})[${(1).toWeird()}]`,
    'u': `([]+${true.toWeird()})[${(2).toWeird()}]`,
    'N': `([]+(${weirdNaN}))[${(0).toWeird()}]`,
    'u': `([]+${weirdUndefined})[${(0).toWeird()}]`,
    'n': `([]+${weirdUndefined})[${(1).toWeird()}]`,
    'd': `([]+${weirdUndefined})[${(2).toWeird()}]`,
    'i': `([]+${weirdUndefined})[${(5).toWeird()}]`,
    'I': `([]${Infinity.toWeird()})[${(0).toWeird()}]`,
    'y': `([]${Infinity.toWeird()})[${(7).toWeird()}]`,
    '-': `([]+${(-Infinity).toWeird()})[${(0).toWeird()}]`,
    '0': `[]+(${(0).toWeird()})`,
    '1': `[]+(${(1).toWeird()})`,
    '2': `[]+(${(2).toWeird()})`,
    '3': `[]+(${(3).toWeird()})`,
    '4': `[]+(${(4).toWeird()})`,
    '5': `[]+(${(5).toWeird()})`,
    '6': `[]+(${(6).toWeird()})`,
    '7': `[]+(${(7).toWeird()})`,
    '8': `[]+(${(8).toWeird()})`,
    '9': `[]+(${(9).toWeird()})`,
    '.': `([]+((${(1).toWeird()})/(${(2).toWeird()})))[${(1).toWeird()}]`
};

String.prototype.toWeird = function(fromCharCode, charCodeAt) {
    var fcc = fromCharCode || 'String.fromCharCode';
    var cca = charCodeAt || 'charCodeAt';
    if (this.length == 0) {
        return '[]+[]';
    } else if (this.length == 1) {
        if (weirdChars.hasOwnProperty(this)) {
            return weirdChars[this];
        } else {
            var c = this.charCodeAt(0);
            var chars = Object.keys(weirdChars);
            for (var i = 0; i < chars.length; i++) {
                chars[i] = chars[i].charCodeAt(0);
            }
            chars[chars.length] = 0;
            var closest = chars.closestTo(c);
            var diff = c - closest;
            var res;
            if (closest == 0) {
                res = fcc + '(' + c.toWeird() + ')';
            } else if (diff > 0) {
                res = fcc + '((' + weirdChars[String.fromCharCode(closest)] + ').' + cca + '(' + (0).toWeird() + ')+(' + diff.toWeird() + '))';
            } else {
                res = fcc + '((' + weirdChars[String.fromCharCode(closest)] + ').' + cca + '(' + (0).toWeird() + ')-(' + (-diff).toWeird() + '))';
            }
            if (eval(res) == this) {
                return res;
            } else {
                throw 'uh-oh...';
            }
        }
    } else {
        var res = '';
        for (var i = 0; i < this.length; i++) {
            if (i != 0) {
                res += '+';
            }
            var c = this[i];
            res += '(' + c.toWeird() + ')';
        }
        return res;
    }
}
