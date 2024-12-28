import React from 'react';
import { Header } from '../components/Header';
import { MenuBar } from '../components/MenuBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';

export function PrivacyPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const lastUpdatedDate = 'December 12, 2024'; // Update with your actual date

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
      
        <h1 className="text-3xl font-medium mb-8">Privacy Policy</h1>
        
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
          Welcome to Stood Apart! We are committed to protecting the privacy and security of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application and website (https://www.stoodapart.com), including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-6">
          We collect information about you in a range of forms. <br/><br/>
          <ul className="list-disc pl-5">
            <li>Non-personal information, which includes anonymous usage data, general demographic information we may collect, referring/exit pages and URLs, platform types, preferences you submit and preferences that are generated based on the data you submit and number of clicks.</li>
            </ul>
          </p>

          <h2 className="text-xl font-medium mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-6">
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to: <br/><br/>
          <ul className="list-disc pl-5">
            <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
            <li>Perform other business activities as needed.</li>
            </ul>

          </p>

          <h2 className="text-xl font-medium mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mb-6">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will update the "last updated" date at the bottom of this Privacy Policy.
          </p>
          <h3 className="text-sm text-gray-500 mt-8">Last Updated: {lastUpdatedDate}</h3> {/* Last updated section */}
        </div>
      </div>

      <Footer />
    </div>
  );
}