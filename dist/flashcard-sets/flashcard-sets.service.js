"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardSetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FlashcardSetsService = class FlashcardSetsService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createFlashcardSet(flashcardSetsInput, userId) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcardSets = await this.prismaService.flashcardSets.create({
            data: {
                subject: flashcardSetsInput.subject,
                userId,
                numberOfCards: 0,
            },
            include: { user: true, flashcards: true },
        });
        return flashcardSets;
    }
    async createFlashcardSetWithFlashcards(flashcardSetsInput, userId) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        this.validateFlashcardItems(flashcardSetsInput.flashcards);
        const flashcardSet = await this.prismaService.$transaction(async (tx) => {
            const createdFlashcardSet = await tx.flashcardSets.create({
                data: {
                    subject: flashcardSetsInput.subject,
                    userId,
                    numberOfCards: flashcardSetsInput.flashcards.length,
                },
            });
            await Promise.all(flashcardSetsInput.flashcards.map((flashcard) => tx.flashcards.create({
                data: {
                    question: flashcard.question,
                    answer: flashcard.answer,
                    flashcardSetId: createdFlashcardSet.id,
                },
            })));
            return tx.flashcardSets.findUnique({
                where: {
                    id: createdFlashcardSet.id,
                },
                include: {
                    user: true,
                    flashcards: true,
                },
            });
        });
        return flashcardSet;
    }
    async viewFlashcardSet(subject, userId) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcardSet = await this.prismaService.flashcardSets.findUnique({
            where: {
                subject: subject,
            },
            include: {
                user: true,
                flashcards: true,
            },
        });
        if (!flashcardSet || flashcardSet.userId !== userId) {
            throw new common_1.NotFoundException('the flashcardSet for this id does not exist');
        }
        return flashcardSet;
    }
    async viewAllFlashcardSets(userId) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcardsets = await this.prismaService.flashcardSets.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: true,
                flashcards: true,
            },
        });
        return flashcardsets;
    }
    async updateFlashcardSets(flashcardSetsInput, userId) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcardSet = await this.prismaService.flashcardSets.findUnique({
            where: {
                subject: flashcardSetsInput.subject,
            },
        });
        if (!flashcardSet || flashcardSet.userId !== userId) {
            throw new common_1.NotFoundException('Flashcard set not found');
        }
        const flashcardsets = await this.prismaService.flashcardSets.update({
            where: {
                id: flashcardSet.id,
            },
            data: {
                subject: flashcardSetsInput.subject,
            },
            include: {
                user: true,
                flashcards: true,
            },
        });
        return flashcardsets;
    }
    async deleteFlashcardSets(subject, userId) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcardSet = await this.prismaService.flashcardSets.findUnique({
            where: {
                subject,
            },
        });
        if (!flashcardSet || flashcardSet.userId !== userId) {
            throw new common_1.NotFoundException('Flashcard set not found');
        }
        const flashcardsets = await this.prismaService.flashcardSets.delete({
            where: {
                id: flashcardSet.id,
            },
            include: {
                user: true,
                flashcards: true,
            },
        });
        return flashcardsets;
    }
    validateFlashcardItems(flashcards) {
        if (!flashcards?.length) {
            throw new common_1.NotFoundException('At least one flashcard is required');
        }
        const hasInvalidFlashcard = flashcards.some((flashcard) => !flashcard.question || !flashcard.answer);
        if (hasInvalidFlashcard) {
            throw new common_1.NotFoundException('Each flashcard requires a question and answer');
        }
    }
};
exports.FlashcardSetsService = FlashcardSetsService;
exports.FlashcardSetsService = FlashcardSetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FlashcardSetsService);
//# sourceMappingURL=flashcard-sets.service.js.map