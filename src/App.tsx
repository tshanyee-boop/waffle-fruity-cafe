import React, { useState } from 'react';
import { GameStationId } from './types';
import { SlideNavbar } from './components/SlideNavbar';
import { SlideTitle } from './slides/SlideTitle';
import { Slide5Customer1 } from './slides/Slide5Customer1';
import { Slide6Decorate } from './slides/Slide6Decorate';
import { Slide7QualityCheck } from './slides/Slide7QualityCheck';
import { Slide8Deliver } from './slides/Slide8Deliver';
import { Slide9Customer2 } from './slides/Slide9Customer2';
import { Slide10SpecialWaffle } from './slides/Slide10SpecialWaffle';
import { SlideDeliver2 } from './slides/SlideDeliver2';
import { SlideCustomer3Order } from './slides/SlideCustomer3Order';
import { SlideCustomer3Decorate } from './slides/SlideCustomer3Decorate';
import { SlideDeliver3 } from './slides/SlideDeliver3';
import { SlideVictory } from './slides/SlideVictory';
import { stopSpeaking } from './utils/audio';

export default function App() {
  const [currentStation, setCurrentStation] = useState<GameStationId>('WELCOME');
  const [chefStars, setChefStars] = useState<number>(0);

  const handleStationChange = (station: GameStationId) => {
    stopSpeaking();
    setCurrentStation(station);
  };

  const handleReset = () => {
    stopSpeaking();
    setCurrentStation('WELCOME');
    setChefStars(0);
  };

  return (
    <div className="min-h-screen bg-[#fffdf9] text-stone-800 flex flex-col font-sans select-none">
      {/* Top Café Stations Navigation & Star Tracker */}
      <SlideNavbar
        currentStation={currentStation}
        onSelectStation={handleStationChange}
        chefStars={chefStars}
        onReset={handleReset}
      />

      {/* Main Game Stage */}
      <main className="flex-1 flex flex-col">
        {currentStation === 'WELCOME' && (
          <SlideTitle
            onStart={() => handleStationChange('CUSTOMER_1_ORDER')}
          />
        )}

        {/* 1st Customer: Lia */}
        {currentStation === 'CUSTOMER_1_ORDER' && (
          <Slide5Customer1
            onAcceptOrder={() => handleStationChange('CUSTOMER_1_DECORATE')}
          />
        )}

        {currentStation === 'CUSTOMER_1_DECORATE' && (
          <Slide6Decorate
            onComplete={() => handleStationChange('QUALITY_CHECK')}
          />
        )}

        {currentStation === 'QUALITY_CHECK' && (
          <Slide7QualityCheck
            onPassed={() => {
              setChefStars((prev) => Math.max(prev, 1));
              handleStationChange('CUSTOMER_1_DELIVER');
            }}
          />
        )}

        {/* Deliver 1: Chef + Lia */}
        {currentStation === 'CUSTOMER_1_DELIVER' && (
          <Slide8Deliver
            onNextOrder={() => {
              setChefStars((prev) => Math.max(prev, 1));
              handleStationChange('CUSTOMER_2_ORDER');
            }}
          />
        )}

        {/* 2nd Customer: Mia */}
        {currentStation === 'CUSTOMER_2_ORDER' && (
          <Slide9Customer2
            onAcceptOrder={() => handleStationChange('CUSTOMER_2_DECORATE')}
          />
        )}

        {currentStation === 'CUSTOMER_2_DECORATE' && (
          <Slide10SpecialWaffle
            onComplete={() => {
              setChefStars((prev) => Math.max(prev, 1));
              handleStationChange('CUSTOMER_2_DELIVER');
            }}
          />
        )}

        {/* Deliver 2: Delivering to Customer Mia */}
        {currentStation === 'CUSTOMER_2_DELIVER' && (
          <SlideDeliver2
            onNextOrder={() => {
              setChefStars((prev) => Math.max(prev, 2));
              handleStationChange('CUSTOMER_3_ORDER');
            }}
          />
        )}

        {/* 3rd Customer: Toby */}
        {currentStation === 'CUSTOMER_3_ORDER' && (
          <SlideCustomer3Order
            onAcceptOrder={() => handleStationChange('CUSTOMER_3_DECORATE')}
          />
        )}

        {currentStation === 'CUSTOMER_3_DECORATE' && (
          <SlideCustomer3Decorate
            onComplete={() => {
              setChefStars((prev) => Math.max(prev, 2));
              handleStationChange('CUSTOMER_3_DELIVER');
            }}
          />
        )}

        {/* Deliver 3: Delivering to Customer 3 (Toby) */}
        {currentStation === 'CUSTOMER_3_DELIVER' && (
          <SlideDeliver3
            onComplete={() => {
              setChefStars(3);
              handleStationChange('CELEBRATION');
            }}
          />
        )}

        {/* Celebration / Certificate / Free Play Kitchen */}
        {currentStation === 'CELEBRATION' && (
          <SlideVictory
            onRestart={handleReset}
            onJumpStation={(station) => handleStationChange(station)}
          />
        )}
      </main>
    </div>
  );
}
