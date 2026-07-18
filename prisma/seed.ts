import { serverEnv } from "@/lib/env/serverEnv";
import { PrismaClient } from "@generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: serverEnv.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const main = async () => {
  console.log("Starting database seeding...");

  try {
    const categories = [
      {
        categoryName: "Nature",
        slug: "nature",
      },
      {
        categoryName: "Technology",
        slug: "technology",
      },
      {
        categoryName: "Gaming",
        slug: "gaming",
      },
      {
        categoryName: "Cars",
        slug: "cars",
      },
      {
        categoryName: "Anime",
        slug: "anime",
      },
      {
        categoryName: "Space",
        slug: "space",
      },
      {
        categoryName: "Architecture",
        slug: "architecture",
      },
      {
        categoryName: "Abstract",
        slug: "abstract",
      },
      {
        categoryName: "Minimal",
        slug: "minimal",
      },
      {
        categoryName: "Animals",
        slug: "animals",
      },
    ];

    // Insert categories into the database
    const createdCategories = await Promise.all(
      categories.map((item) => {
        prisma.category.upsert({
          where: { slug: item.slug },
          update: {},
          create: item,
        });
      }),
    );

    console.log(`Seeded ${createdCategories.length} categories.`);
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    console.log("Disconnecting from database...");
    await prisma.$disconnect();
    console.log("Disconnected successfully");
  }
};

main().catch((e) => {
  console.error("Fatal error during seeding:", e);
  process.exit(1);
});
