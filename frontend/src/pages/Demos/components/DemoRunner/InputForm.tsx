import React from 'react';

import { motion } from 'framer-motion';

import { defaultTransition, fadeInUp } from '@utils/animations';

import './DemoRunner.scss';

interface InputFormProps {
  onSubmit: (values: { integer: number; float: number }) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [values, setValues] = React.useState({
    integer: 3,
    float: 0.1,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [id]: id === 'integer' ? parseInt(value) || '' : parseFloat(value) || '',
    }));
  };

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (values.integer < 3 || values.integer > 10) {
      newErrors.integer = 'Integer must be between 3 and 10';
    }

    if (values.float < 0.1 || values.float > 6.0) {
      newErrors.float = 'Float must be between 0.1 and 6.0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      onSubmit(values as { integer: number; float: number });
    }
  };

  return (
    <motion.form
      className="demo-input-form"
      variants={fadeInUp}
      transition={defaultTransition}
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="integer">Integer Value (3-10)</label>
        <input
          type="number"
          id="integer"
          value={values.integer}
          onChange={handleChange}
          min={3}
          max={10}
          step={1}
          required
        />
        {errors.integer && <span className="error">{errors.integer}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="float">Float Value (0.1-6.0)</label>
        <input
          type="number"
          id="float"
          value={values.float}
          onChange={handleChange}
          min={0.1}
          max={6.0}
          step={0.1}
          required
        />
        {errors.float && <span className="error">{errors.float}</span>}
      </div>

      <button type="submit" className="btn btn--primary" disabled={isLoading}>
        {isLoading ? 'Running...' : 'Run Demo'}
      </button>
    </motion.form>
  );
};
