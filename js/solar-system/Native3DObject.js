export class Native3DObject {

    getObject = () => {
        throw new Error("Method 'getObject' is not implemented!");
    };

    add = (object) => {
        this.addNative(object.getObject());
    }

    addNative = (object) => {
        this.getObject().add(object);
    }
}