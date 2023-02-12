import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

const url = new URL(process.env.DATABASE_URL);
url.searchParams.delete('sslmode');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: url.toString(),
      ssl: process.env.CA_CERT && {
        ca: process.env.CA_CERT,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
