'use client'

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JapaneseYenIcon } from 'lucide-react';
import Link from 'next/link';

import { SearchComponent } from '@/components/search-component';
import { SearchBar } from '@/components/search-bar';

export default function SearchPage() {
    
    return (
      <div>
        <Header/>
        {/* < SearchBar/> */}
        <SearchComponent/>
        <Footer/>
      </div>
    )
} 