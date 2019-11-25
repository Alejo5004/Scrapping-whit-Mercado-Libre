class Animal
{
    constructor(name, description){
        this.name = name
        this.description = description
    }

    reproducir(){
        return 'Se esta Reproduciendo ${this.name}'
    }
}
module.export = Animal;