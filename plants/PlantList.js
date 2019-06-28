
let list = [];

class PlantList {
 
    static get() {
        return list;
    }

    static add(plantName, lastWatered) {
        var len = list.length;
        list.push({
            key: plantName,
            wateredDate: lastWatered,
            index: len,
        });
    }

    static remove(index) {
        list.splice(index, index);
    }

    static getPlant(index) {
        list[index];
    }
}

export default PlantList;
