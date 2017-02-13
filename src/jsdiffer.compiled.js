"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsDiffer = function () {
    function JsDiffer() {
        _classCallCheck(this, JsDiffer);

        this._lcs_sol = {};
        this._diff_res = [];
    }

    _createClass(JsDiffer, [{
        key: "setX",
        value: function setX(new_x) {
            this._x = new_x;
        }
    }, {
        key: "setY",
        value: function setY(new_y) {
            this._y = new_y;
        }
    }, {
        key: "lcs",
        value: function lcs() {
            return this._lcs_recursive(this._x, this._y, this._x.length - 1, this._y.length - 1);
        }
    }, {
        key: "_lcs_length",
        value: function _lcs_length(x, y) {
            var c = [];
            for (var i = 0; i <= x.length; i++) {
                c[i] = [];
                for (var j = 0; j <= y.length; j++) {
                    c[i][j] = 0;
                }
            }
            for (var i = 1; i <= x.length; i++) {
                for (var j = 1; j <= y.length; j++) {
                    if (x[i] == y[j]) {
                        c[i][j] = c[i - 1][j - 1] + 1;
                    } else {
                        c[i][j] = Math.max(c[i][j - 1], c[i - 1][j]);
                    }
                }
            }
            return c;
        }
    }, {
        key: "_lcs_diff",
        value: function _lcs_diff(c, x, y, i, j) {
            if (i >= 0 && j >= 0 && x[i] == y[j]) {
                this._lcs_diff(c, x, y, i - 1, j - 1);
                this._diff_res.push(["#", [i, j], x[i]]);
                return [x[i]];
            } else if (j > 0 && (i == 0 || c[i][j - 1] >= c[i - 1][j])) {
                this._lcs_diff(c, x, y, i, j - 1);
                this._diff_res.push(["+", [i, j], y[j]]);
                return ["+ " + y[j]];
            } else if (i > 0 && (j == 0 || c[i][j - 1] < c[i - 1][j])) {
                this._lcs_diff(c, x, y, i - 1, j);
                this._diff_res.push(["-", [i, j], x[i]]);
                return ["- " + x[i]];
            } else {
                return [];
            }
        }
    }, {
        key: "diff",
        value: function diff() {
            this._diff_res = [];
            this._lcs_diff(this._lcs_length(this._x, this._y), this._x, this._y, this._x.length - 1, this._y.length - 1);
            return this._diff_res;
        }
    }, {
        key: "_lcs_recursive",
        value: function _lcs_recursive(x, y, i, j) {
            var sol = this._lcs_get_sol(x, y, i, j);
            if (sol !== null) {
                return sol;
            } else {
                sol = [];
            }
            if (i < 0 || j < 0) {
                return sol;
            } else {
                if (x[i] === y[j]) {
                    sol = this._lcs_recursive(x, y, i - 1, j - 1);
                    sol = sol.concat([x[i]]);
                } else {
                    var sol_a = this._lcs_recursive(x, y, i - 1, j);
                    var sol_b = this._lcs_recursive(x, y, i, j - 1);
                    if (i > 0 && (j == 0 || sol_a.length > sol_b.length)) {
                        sol = sol.concat(["- " + x[i]]);
                    } else if (j > 0 && (i == 0 || sol_a.length <= sol_b.length)) {
                        sol = sol.concat(["+ " + y[j]]);
                    }
                }
                //this._lcs_push_sol(x,y,i,j,sol);
                console.log(sol);
                return sol;j;
            }
        }
    }, {
        key: "_lcs_push_sol",
        value: function _lcs_push_sol(x, y, i, j, sol) {
            this._lcs_sol[JSON.stringify([x, y, i, j])] = sol;
        }
    }, {
        key: "_lcs_get_sol",
        value: function _lcs_get_sol(x, y, i, j) {
            if (JSON.stringify([x, y, i, j]) in this._lcs_sol) {
                return this._lcs_sol[JSON.stringify([x, y, i, j])];
            } else {
                return null;
            }
        }
    }]);

    return JsDiffer;
}();