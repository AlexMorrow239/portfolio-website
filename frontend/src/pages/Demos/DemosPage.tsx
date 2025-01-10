import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';

import { defaultTransition, staggerTransition } from '@/utils/animations/transitions';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations/variants';

import './DemosPage.scss';
import { DemoCard } from './components/DemoCard/DemoCard';
import { availableDemos } from './demos';

const DemosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tags from all demos
  const allTags = Array.from(new Set(availableDemos.flatMap((demo) => demo.tags))).sort();

  // Filter demos based on search and tags
  const filteredDemos = availableDemos.filter((demo) => {
    const matchesSearch =
      demo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => demo.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <motion.div
      className="demos"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={staggerTransition(0.2)}
    >
      <motion.div className="demos__header" variants={fadeInUp} transition={defaultTransition}>
        <h1>Interactive Demos</h1>
        <p>
          Explore live demonstrations of some of my projects that are not standalone applications.
          For the technical folks, these demos run in containerized environments supporting multiple
          programming languages.
        </p>
      </motion.div>

      <motion.div className="demos__controls" variants={fadeInUp} transition={defaultTransition}>
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search demos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tags">
          <Filter size={20} className="filter-icon" />
          <div className="tags-container">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${searchTerm}-${selectedTags.join()}`}
          className="demos__grid"
          variants={staggerContainer}
          transition={staggerTransition(0.1)}
        >
          {filteredDemos.length > 0 ? (
            filteredDemos.map((demo) => (
              <motion.div
                key={demo.id}
                variants={fadeIn}
                transition={defaultTransition}
                className="demo-wrapper"
              >
                <DemoCard {...demo} />
              </motion.div>
            ))
          ) : (
            <motion.div className="no-results" variants={fadeIn} transition={defaultTransition}>
              <p>No demos found matching your criteria</p>
              <button
                className="btn btn--secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTags([]);
                }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DemosPage;
