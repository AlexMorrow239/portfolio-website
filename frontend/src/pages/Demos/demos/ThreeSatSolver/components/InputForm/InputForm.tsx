import React from 'react';

import { motion } from 'framer-motion';

import { defaultTransition } from '@/utils/animations/transitions';
import { fadeInUp } from '@/utils/animations/variants';

import { SolverInput } from '../../types';
import './InputForm.scss';

interface InputFormProps {
  onSubmit: (values: SolverInput) => void;
  isLoading: boolean;
}

interface FormValues {
  n: string;
  ratio: string;
}

interface FormErrors {
  n?: string;
  ratio?: string;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [values, setValues] = React.useState<FormValues>({
    n: '3',
    ratio: '2.0',
  });
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Update to match the actual input IDs
    if (value === '') {
      setValues((prev) => ({
        ...prev,
        [id]: id === 'n' ? '3' : '2.0',
      }));
      return;
    }

    // Update ID checks to match input IDs
    if (id === 'n') {
      const num = parseInt(value);
      if (num >= 3 && num <= 5) {
        setValues((prev) => ({ ...prev, [id]: value }));
      }
    } else if (id === 'ratio') {
      const num = parseFloat(value);
      if (num >= 2.0 && num <= 5.0) {
        setValues((prev) => ({ ...prev, [id]: value }));
      }
    }

    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      onSubmit({
        integer: parseInt(values.n),
        float: parseFloat(values.ratio),
      });
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: FormErrors = {};
    const integerValue = parseInt(values.n);
    const floatValue = parseFloat(values.ratio);

    if (isNaN(integerValue)) {
      newErrors.n = 'Please enter 3, 4, or 5.';
    } else if (integerValue < 3 || integerValue > 5) {
      newErrors.n = 'n must be between 3 and 5';
    }

    if (isNaN(floatValue)) {
      newErrors.ratio = 'Please enter a valid decimal number';
    } else if (floatValue < 2.0 || floatValue > 5.0) {
      newErrors.ratio = 'Float must be between 2.0 and 5.0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <motion.form
      className="input-form"
      variants={fadeInUp}
      transition={defaultTransition}
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="n">Number of Variables or n (3-5)</label>
        <input
          type="number"
          id="n"
          value={values.n}
          onChange={handleChange}
          min={3}
          max={5}
          step={1}
          required
          disabled={isLoading}
        />
        {errors.n && <span className="error">{errors.n}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="ratio">Clause/Variable Ratio (2.0-5.0)</label>
        <input
          type="number"
          id="ratio"
          value={values.ratio}
          onChange={handleChange}
          min={2.0}
          max={5.0}
          step={0.1}
          required
          disabled={isLoading}
        />
        {errors.ratio && <span className="error">{errors.ratio}</span>}
      </div>

      <button type="submit" className="btn btn--primary" disabled={isLoading}>
        {isLoading ? 'Running...' : 'Run Demo'}
      </button>
    </motion.form>
  );
};
