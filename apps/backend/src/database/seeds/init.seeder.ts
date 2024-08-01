import { NestFactory } from '@nestjs/core';
import { SeederModule } from '../seeder/seeder.module';
import { SeederService } from '../seeder/seeder.service'; 

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seeder = appContext.get(SeederService);

  try {
    await seeder.seed();
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed!', error);
  } finally {
    await appContext.close();
  }
}
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
} else {
  console.log('Seeders should not be run in production');
}
