class JsDiffer {
    constructor(){
        this._lcs_sol = {};   
    }

    setX(new_x) {
        this._x = new_x;
    }

    setY(new_y) {
        this._y = new_y;
    }

    lcs(){
        return this._lcs_recursive(this._x, this._y, this._x.length - 1, this._y.length - 1);
    }

    _lcs_recursive(x,y,i,j) {
        var sol = this._lcs_get_sol(x,y,i,j);
        if (sol !== null){
            return sol;
        } else {
            sol = []
        }
        if (i < 0 || j < 0){
            return sol;
        } else {
            if (x[i] === y[j]){
                sol = this._lcs_recursive(x,y,i-1,j-1);
                sol = sol.concat([x[i]]);
            } else {
                var sol_a = this._lcs_recursive(x,y,i-1,j);
                var sol_b = this._lcs_recursive(x,y,i,j-1);
                if (sol_a.length > sol_b.length){
                    sol = sol_a;
                } else {
                    sol = sol_b;
                }
            }
            this._lcs_push_sol(x,y,i,j,sol);
            return sol;
        }
    }

    _lcs_push_sol(x,y,i,j,sol){
        this._lcs_sol[JSON.stringify([x,y,i,j])] = sol;
    }

    _lcs_get_sol(x,y,i,j){
        if (JSON.stringify([x,y,i,j]) in this._lcs_sol){
            return this._lcs_sol[JSON.stringify([x,y,i,j])];
        } else {
            return null;
        }
    }

}
