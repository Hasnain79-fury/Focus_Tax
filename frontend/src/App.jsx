import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { Divider } from './components/Divider/Divider';
import { Stance } from './components/Stance/Stance';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { Demo } from './components/Demo/Demo';
import { Settings } from './components/Settings/Settings';
import { Plan } from './components/Plan/Plan';
import { Stack } from './components/Stack/Stack';
import { Footer } from './components/Footer/Footer';
import { useDemoState } from './hooks/useDemoState';

function App() {
  const demo = useDemoState();

  return (
    <>
      <Nav />
      <Hero />
      <Divider />
      <Stance />
      <Divider />
      <HowItWorks />
      <Demo
        timerDuration={demo.timerDuration}
        onTimerChange={demo.updateTimerDuration}
        researchMode={demo.researchMode}
        onResearchChange={demo.toggleResearchMode}
        challengeType={demo.currentChallenge}
        onChallengeChange={demo.switchChallenge}
        strictMode={demo.strictMode}
        onStrictChange={demo.toggleStrictMode}
      />
      <Settings
        timerDuration={demo.timerDuration}
        onTimerChange={demo.updateTimerDuration}
        researchMode={demo.researchMode}
        onResearchChange={demo.toggleResearchMode}
        challengeType={demo.currentChallenge}
        onChallengeChange={demo.switchChallenge}
        strictMode={demo.strictMode}
        onStrictChange={demo.toggleStrictMode}
      />
      <Plan />
      <Stack />
      <Footer />
    </>
  );
}

export default App;
