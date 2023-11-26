import os
import random
import math 
import pygame
from os import listdir
from os.path import isfile, join
pygame.init()

pygame.display.set_caption('Platformer')

BG_COLOUR = (255, 255, 255)
WIDTH, HEIGHT = 1000, 800

FPS = 120
PLAYER_VEL = 5

window = pygame.display.set_mode((WIDTH, HEIGHT))

def get_background(name):
    image = pygame.image.load(join('assets', 'Bacground', name))
    _, _, width, height = image.get_rect()
    tiles = []

    for i in range(WIDTH // width + 1):
        for j in range(HEIGHT // height + 1):
            pos = [i * width, j * height]
            tiles.append(pos)
    
    return tiles, image



def main(window):
    clock = pygame.time.Clock()
    background = get_background('Brown.png')
    
    run = True
    while run:
        clock.tick(FPS)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
                break
    
    pygame.quit
    quit()



if __name__ == '__main__':
    main(window)