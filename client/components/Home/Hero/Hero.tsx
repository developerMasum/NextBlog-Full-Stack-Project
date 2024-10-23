'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import assets from '@/public';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export function Hero() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const carousel01 = assets.images.banner01;
  const carousel02 = assets.images.banner02;
  const carousel03 = assets.images.banner03;
  const carouselImages = [carousel01, carousel02, carousel03];

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        opts={{ align: 'start', loop: true }}
        className="w-full min-h-screen max-w-full"
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <CardContent>
                  <Image
                    src={image}
                    width={2000}
                    height={2000}
                    alt={` logo`}
                    className="rounded-md mr-1"
                  />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
