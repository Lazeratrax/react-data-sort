import faker from "faker";

const data = [];

for (let i = 0; i < 100; i++) {
    data.push({
        id: i,
        name: faker.name.firstName(),
        email: faker.internet.email()
    });
}

export default data;