// import { CallToAction } from '@/components/CallToAction'
// import { Faqs } from '@/components/Faqs'
import { Produtos } from '@/components/Produtos'
// import { Pricing } from '@/components/Pricing'
// import { PrimaryFeatures } from '@/components/PrimaryFeatures'
// import { Reviews } from '@/components/Reviews'
// import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import {BarraDePesquisa} from "@/components/BarraDePesquisa";
import { createSignal, onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
export default function Home() {
  return (
    <>
        <BarraDePesquisa />
        <Produtos />
      {/*<PrimaryFeatures />*/}
      {/*<SecondaryFeatures />*/}
      {/*<CallToAction />*/}
      {/*<Reviews />*/}
      {/*<Pricing />*/}
      {/*<Faqs />*/}
    </>
  )
}
