const shortid = require('shortid');

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: shortid.generate(),  
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    updateItem(id,value){
        this.items.forEach((el) => {
            if(id === el.id){
                el.count = parseFloat(value); 
            }
        });
    }
   
}