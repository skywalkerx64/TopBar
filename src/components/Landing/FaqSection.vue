<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface FAQProps {
  question: string
  answer: string
  id: number
}

const FAQList: FAQProps[] = [
  {
    id: 1,
    question: 'What is the Smart Top Bar?',
    answer:
      "It's a lightweight script that detects in-app browsers (like Facebook or Instagram) and displays a customizable top bar prompting users to open the page in their native browser for better experience and tracking.",
  },
  {
    id: 2,
    question: 'Why should I use the Top Bar?',
    answer: 'In-app browsers block cookies, mess with tracking, and often cause lost sales. Our Top Bar helps recover conversions by encouraging users to switch to Safari or Chrome.',
  },
  {
    id: 3,
    question: 'Is it easy to install?',
    answer: "Yes! Just generate your script through our interface and paste it into your website's code. No complex setup required.",
  },
  {
    id: 4,
    question: 'Can I customize the Top Bar?',
    answer: 'Absolutely. You can choose your own message, colors, and even upload a GIF to guide users visually.',
  },
  {
    id: 5,
    question: 'Does it track user interactions?',
    answer: 'Yes, the Top Bar tracks clicks and estimated conversions, so you can see the real impact right from your dashboard.',
  },
]
</script>

<template>
  <section id="faq" class="container md:w-[700px] py-20 sm:py-24">
    <div class="text-center mb-8">
      <h2 class="text-3xl md:text-4xl text-center font-bold">Common Questions</h2>
    </div>

    <Accordion type="single" collapsible class="AccordionRoot">
      <AccordionItem v-for="{ question, answer, id } in FAQList" :key="id" :value="id.toString()">
        <AccordionTrigger class="text-left">
          {{ question }}
        </AccordionTrigger>

        <AccordionContent>{{ answer }}</AccordionContent>
      </AccordionItem>
    </Accordion>

    <h3 class="font-medium mt-4">
      Still have questions?
      <span href="#" class="text-muted-foreground">
        <a href="#" class="underline">Contact us</a>
      </span>
    </h3>
  </section>
</template>
