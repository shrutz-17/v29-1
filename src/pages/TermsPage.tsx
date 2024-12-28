import React from 'react';
import { Header } from '../components/Header';
import { MenuBar } from '../components/MenuBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';

export function TermsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const lastUpdatedDate = 'December 12, 2024';

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onHeartClick={() => {}}
      />
      <MenuBar />
      <Breadcrumb />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
          Welcome to Stood Apart! We are a dedicated petite fashion marketplace focussed on offering clothing recommendations and a curated shopping experience for petite women. Our platform brings together a variety of retailers and brands to provide the best styles, fits, and trends specifically for smaller frames. By using our website, mobile application, and services ("Service"), you agree to be bound by these Terms and Conditions. Please read them carefully before using our Services.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-4">Use of Website</h2>
          <p className="text-gray-600 mb-6">
          By accessing and using the Stood Apart website, you agree to comply with our Terms and Conditions. You are responsible for ensuring that any information you provide is accurate and up to date. We grant you a limited, non-exclusive, and non-transferable license to use the website for personal, non-commercial purposes in accordance with these Terms.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-4">Intellectual Property</h2>
          <p className="text-gray-600 mb-6">
          The content, arrangement, and layout of this site, including but not limited to, the text, graphics, images, photographs, videos, illustrations, and software, is owned by Plush, its licensors, or other providers of such material and is protected by copyright and intellectual property laws.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-4">Third-Party Links</h2>
          <p className="text-gray-600 mb-6">
          Our Service may contain links to third-party websites or services that are not owned or controlled by Stood Apart. Stood Apart has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We recommend that you review the terms and conditions and privacy policies of any third-party sites you visit through our platform.
          </p>
          <h3 className="text-sm text-gray-500 mt-8">Last Updated: {lastUpdatedDate}</h3> {/* Last updated section */}
        </div>
      </div>

      <Footer />
    </div>
  );
}