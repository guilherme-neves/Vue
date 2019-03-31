

export function linechatsServiceCount(resp) {
    var count = [];
    resp.map(i => {
        count.push(i['count'])
    });
    console.log(count)
    return count
}

export function linechatsServiceLabel(resp) {
    var label = [];
    resp.map(i => {
        label.push(i['label'])
       
    });
    console.log(label)
    return label
}



