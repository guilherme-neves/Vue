

export function barchatsService(resp) {
    var x;
    resp.map(i => {
        x = Object.keys(i).map(k => {
            return i[k];
        });
    });
    return x
}



