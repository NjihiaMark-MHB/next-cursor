import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

const fakerUser = () => ({
	email: faker.internet.email(),
	name: faker.person.fullName(),
	avatar: faker.image.avatar(),
});

async function main() {
	console.log("Seeding...");
	const users = Array.from({ length: 400 }, fakerUser);
	await prisma.user.createMany({ data: users });
	console.log("Seeded!");
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
}).finally(async () => {
	await prisma.$disconnect();
});