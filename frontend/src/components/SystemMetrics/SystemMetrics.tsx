import React from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, Clock, Server, Database, Network } from "lucide-react";

interface MetricItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
}

interface SystemMetricsProps {
  title?: string;
  metrics: MetricItem[];
  variant?: "default" | "compact" | "detailed";
}

const SystemMetrics: React.FC<SystemMetricsProps> = ({
  title = "System Performance",
  metrics,
  variant = "default",
}) => {
  const defaultMetrics: MetricItem[] = [
    {
      icon: <Clock size={24} />,
      value: "<100ms",
      label: "Response Time",
      description: "Average API response time",
    },
    {
      icon: <Activity size={24} />,
      value: "99.99%",
      label: "Uptime",
      description: "System availability",
    },
    {
      icon: <Network size={24} />,
      value: "10k+",
      label: "RPS",
      description: "Requests per second",
    },
    {
      icon: <Database size={24} />,
      value: "50TB+",
      label: "Data Processed",
      description: "Monthly data throughput",
    },
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <section className={`system-metrics system-metrics--${variant}`}>
      {title && (
        <motion.h2
          className="system-metrics__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h2>
      )}

      <div className="system-metrics__grid">
        {displayMetrics.map((metric, index) => (
          <motion.div
            key={index}
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="metric-card__icon">{metric.icon}</div>
            <div className="metric-card__content">
              <h3 className="metric-card__value">{metric.value}</h3>
              <p className="metric-card__label">{metric.label}</p>
              {variant === "detailed" && metric.description && (
                <p className="metric-card__description">{metric.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SystemMetrics;
