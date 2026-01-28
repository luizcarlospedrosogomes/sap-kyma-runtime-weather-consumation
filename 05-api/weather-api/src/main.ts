import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { XssecPassportStrategy, XsuaaService } from '@sap/xssec';
import { getServices, loadEnv } from '@sap/xsenv';
import passport from 'passport';

import { AppModule } from './app.module';
loadEnv()
let { xsuaa } = getServices({ xsuaa: { tag: 'xsuaa' } });
  const authService = new XsuaaService(xsuaa); 
  passport.use(new XssecPassportStrategy(authService));
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const options = new DocumentBuilder()
    .setTitle('spro-prod-screen_control-v2')
    .setDescription('APIs for SCA')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('screen control')
    .build();

  const targetService = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, targetService);
  app.use(passport.initialize());
  app.use(passport.authenticate('JWT', { session: false }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
