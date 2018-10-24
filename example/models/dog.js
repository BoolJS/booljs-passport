'use strict';

const dogs = [];

module.exports = class DogModel {
    constructor (app) {
        this.Error = app.Error;
    }

    async list () {
        return dogs;
    }

    async index (id) {
        for (let index in dogs) {
            if (dogs[index].id === id) {
                return index;
            }
        }

        return null;
    }

    async find (id) {
        let index = this.index(id);

        if (index === null) {
            throw new this.Error(404,
                'dog_not_found', 'The searched dog wasn\'t in the list'
            );
        }

        return dogs[index];
    }

    async update (id, data) {
        let index = this.index(id);
        let dog = dogs[index];

        let { ...dogProps } = dog;
        let { ...dataProps } = data;

        dogs[index] = { ...dogProps, ...dataProps };
    }

    async delete (id) {
        let index = await this.index(id);

        if (index === null) {
            throw new this.Error(404,
                'dog_not_found', 'The searched dog wasn\'t in the list'
            );
        }

        dogs.splice(index, 1);
    }
};
