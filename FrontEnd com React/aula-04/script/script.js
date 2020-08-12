class Animal {
  constructor(name) {
    this.Name = name;
  }

  speak() {
    console.log(`${this.Name} falando....`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.Name} (${this.type}) latindo....`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.Name} (${this.type}) miando....`);
  }
}

const animal = new Animal('Mike o cachoro');
const dog = new Dog('Mike', 'tomba lixo');
const cat = new Cat('Garfield', 'preguiçoso');

animal.speak();
dog.speak();
cat.speak();
