import { useId } from 'react'
import { Container } from '@/components/Container'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BackgroundIllustration(props: React.ComponentPropsWithoutRef<'div'>) {
  let id = useId()

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  )
}

interface Person {
    id: string;
    nome: string;
    descricao: string;
    emEstoque: boolean;
    imagemURL: string;
    valor: number;
}

// async function fetchData() {
//     const apiUrl = String(process.env.NEXT_PUBLIC_API_ENDPOINT+"/api/lista/produtos");
//     try {
//         const response = await axios.get(apiUrl);
//         const peopleData: Person[] = response.data;
//         console.log(peopleData);
//         return peopleData;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return []
//     }
// }

export async function Produtos() {

    // const peopleData: Person[] = await fetchData();
    const peopleData: Person[] = [
        {id:"2",nome:"Cerveja Imperio",descricao:"Elegância em cada gole. Cerveja Império oferece um sabor refinado para momentos especiais.","valor":2.5,"emEstoque":true,"imagemURL":"https://storage.googleapis.com/produtos-lojinha/Bebidas/Imperio.png"},
        {id:"1",nome:"Cerveja Budweiser",descricao:"American classic. Budweiser, a cerveja que traz o autêntico sabor dos EUA em cada garrafa.","valor":3,"emEstoque":true,"imagemURL":"https://storage.googleapis.com/produtos-lojinha/Bebidas/budweiser.png"},
        {id:"3",nome:"Cerveja Heineken",descricao:"A autêntica experiência cervejeira. Heineken, a escolha premium para quem busca qualidade inigualável.","valor":7,"emEstoque":false,"imagemURL":"https://storage.googleapis.com/produtos-lojinha/Bebidas/heineken.png"},
        {id:"4",nome:"Cerveja Imperio",descricao:"Elegância em cada gole. Cerveja Império oferece um sabor refinado para momentos especiais.","valor":2.5,"emEstoque":true,"imagemURL":"https://storage.googleapis.com/produtos-lojinha/Bebidas/Imperio.png"},
        {id:"5",nome:"Cerveja Budweiser",descricao:"American classic. Budweiser, a cerveja que traz o autêntico sabor dos EUA em cada garrafa.","valor":3,"emEstoque":true,"imagemURL":"https://storage.googleapis.com/produtos-lojinha/Bebidas/budweiser.png"},
        {id:"6",nome:"Cerveja Heineken",descricao:"A autêntica experiência cervejeira. Heineken, a escolha premium para quem busca qualidade inigualável.","valor":7,"emEstoque":false,"imagemURL":"https://storage.googleapis.com/produtos-lojinha/Bebidas/heineken.png"}]
    return (
        <div className="overflow-hidden py-20 sm:py-py-20 lg:pb-py-20 xl:pb-py-20">
            <Container>
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {peopleData.map((person) => (
                        <li  key={person.id} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                            <div className="flex flex-1 flex-col p-8">
                                <h3 className="mt-6 text-sm font-medium text-gray-900">{person.nome}</h3>
                                <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={person.imagemURL} alt=""/>
                                <dl className="mt-1 flex flex-grow flex-col justify-between">
                                    <dt className="sr-only">Title</dt>
                                    <dd className="text-sm text-gray-500">{person.descricao}</dd>
                                    <dt className="sr-only">Role</dt>
                                    <dd className="mt-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                                person.emEstoque ? 'bg-green-50 text-green-700 ring-green-600/20': 'bg-red-50 text-red-700 ring-red-600/20'
                                            }`}
                                        >
                                          {person.emEstoque ? 'R$ ' + person.valor : 'Fora de Estoque'}
                                        </span>
                                    </dd>
                                </dl>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    )
}
