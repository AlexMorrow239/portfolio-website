import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import './TagInput.scss';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add tag...',
  error,
}) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onTagsChange([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={`tag-input ${error ? 'tag-input--error' : ''}`}>
      <div className="tag-input__tags">
        {tags.map((tag) => (
          <span key={tag} className="tag-input__tag">
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </div>
      {error && <span className="tag-input__error">{error}</span>}
    </div>
  );
};

export default TagInput;
