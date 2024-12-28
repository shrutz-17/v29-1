import React from 'react';
import { Header } from '../components/Header';
import { MenuBar } from '../components/MenuBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function AboutPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onHeartClick={() => {}}
      />
      <MenuBar />
      <Breadcrumb />
      
      <div className="relative h-[200px] sm:h-[300px] overflow-hidden">
        <img
          src="https://kaboompics.com/cache/9/c/7/e/d/9c7ed53b2a54898ad702af60567aff265016df03.jpeg"
          alt="About Us Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-light text-center px-4">
            Petite Style, Perfect Fit
          </h1>
        </div>
      </div>

      <div id="about" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-medium text-center mb-6 sm:mb-8">
          About Us
        </h2>
        <div className="space-y-6 text-center">
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Welcome to Stood Apart, where petite fashion is celebrated. We bring you a curated collection of clothing from trusted brands, ensuring every piece is tailored for those 5'4" and under.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            No more scrolling endlessly for sizes that work—our platform is designed to simplify your search and highlight the styles you love. Whether you're looking for workwear, casual outfits, or statement pieces, we've got you covered.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Discover fashion that embraces your size and style, effortlessly.
          </p>
        </div>
      </div>

      <div id="sizing" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-medium mb-4">Sizing Guide</h2>
          <p className="text-gray-600">Petite sizing is designed for women who are <strong>5'4" (162 cm) or shorter</strong>, offering proportions tailored to smaller frames. This includes <strong>shorter inseams, adjusted sleeve lengths, and thoughtfully proportioned cuts</strong> that flatter petite silhouettes.<br/><br/>
In addition to petite fits, we also stock versatile styles such as <strong>7/8 lengths for trousers and leggings</strong>. These styles, ending just above the ankle, are perfect for petite sizes and provide a streamlined look that is universally flattering for all heights.
</p>
        </div>
      </div>

      <div id="affiliate" className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-medium mb-4">Affiliate Disclosure</h2>
          <p className="text-gray-600">This Affiliate Disclosure is provided by Stood Apart, Ltd. ("us", "we", "our", or "Company") and applies to www.stoodapart.com (the "Website"), including, without limitation, both mobile and online versions of our websites and social channels (collectively referred to herein as the "Website"). This disclosure is provided for the purpose of explaining our financial relationship with affiliates, advertisers, sponsors, and other third parties that appear on the Website (collectively referred to herein as "Affiliates"), pursuant to the UK’s Advertising Standards Authority (ASA) guidelines and relevant consumer protection laws.<br/><br/>

This Affiliate Disclosure has been posted on the Website or otherwise linked to in posts or articles because we receive monetary and other forms of compensation from Affiliates for various advertising, sponsorships, insertion orders, and promotional campaigns that we feature on the Website. As such, there is a paid connection between each product or service mentioned, reviewed, or recommended on this Website and the Affiliate (i.e., the owner of that third-party product or service). If you decide to purchase a product or service mentioned on the Website, we may receive additional compensation from that purchase from the Affiliate. We strive to provide true and accurate statements in regards to any and all products or services mentioned, reviewed, or recommended by us on this Website.<br/><br/>

Additionally, the Website may post or otherwise promote content, including editorial content, which features third-party products and services (the "Affiliate Products") and may link to third-party owned and operated websites where you can purchase Affiliate Products. Any time you click on a link to an Affiliate Product on the Website and then follow the link to purchase an Affiliate Product on the Affiliate's website, we will receive compensation from the Affiliate offering the Affiliate Product. The content featuring Affiliate Products may not always be identified on the Website as paid or sponsored content, and the compensation that we receive from Affiliates may influence the content, topics, or posts we make on the Website and where they are posted. Even though we may receive compensation in connection with your purchase of Affiliate Products as outlined above, we still aim to provide our honest opinions, findings, beliefs, and experiences as they relate to the products and services featured on the Website.<br/><br/>

Our Affiliate:<br/><br/>
<ul className="list-disc pl-5">
        <li><a href="https://www.awin.com" target="_blank" rel="noopener noreferrer" className="underline">Awin</a></li>
      </ul>
    </p>
        </div>
      </div>

      <div id="brands" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-medium mb-4">Brands</h2>
          <p className="text-gray-600">At Stood Apart, we proudly offer a curated selection of over 50 brands specializing in petite fashion. Our collection is continually expanding, as we actively work to incorporate new brands daily, ensuring our customers have access to the latest styles and trends tailored to their needs.</p>
        </div>
      </div>

      <div id="collaborate" className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-medium mb-4">Collaborate</h2>
          <p className="text-gray-600">At Stood Apart, we believe in the power of partnerships. We are always open to collaborating with like-minded brands, influencers, and industry leaders to bring more value to our community. If you're interested in working together, please reach out to discuss potential opportunities and how we can create meaningful connections.</p>
        </div>
      </div>

      <div id="contact" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-medium mb-4">Contact Us</h2>
          <p className="text-gray-600">We’d love to hear from you! Whether you have questions, feedback, or inquiries, our team is here to assist you. Please feel free to reach out through any of the following methods: <br/><br/>

<strong>Email</strong>: hello@stoodapart.com <br/>
<strong>Social Media</strong>: Follow us on Instagram, Facebook, and Twitter <br/><br/>

We aim to respond to all inquiries within 1-2 business days. Thank you for getting in touch!</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}