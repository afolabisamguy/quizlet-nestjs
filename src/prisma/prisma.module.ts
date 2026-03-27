// Import Module from @nestjs/common.
import { Module } from '@nestjs/common';
// Import PrismaService from ./prisma.service.
import { PrismaService } from './prisma.service';

// Apply the Module decorator to the next declaration.
@Module({
  // Set the providers field in the current object or type.
  providers: [PrismaService],
  // Set the exports field in the current object or type.
  exports: [PrismaService],
// Close the current object or callback block.
})
// Define the PrismaModule class for this module feature.
export class PrismaModule {}
