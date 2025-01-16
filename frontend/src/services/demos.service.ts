import { API_BASE_URL } from '@/config';
import { SolverInput, SolverOutput } from '@/pages/Demos/demos/ThreeSatSolver/types';

export async function runSatSolver(params: SolverInput): Promise<SolverOutput> {
  try {
    const response = await fetch(`${API_BASE_URL}/demos/three-sat/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        n: params.integer,
        ratio: params.float,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('SAT Solver API Error:', {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      throw new Error(data.message || 'Failed to run SAT solver');
    }

    return data;
  } catch (error) {
    console.error('SAT Solver API Error:', {
      error,
      params,
    });
    throw error;
  }
}
