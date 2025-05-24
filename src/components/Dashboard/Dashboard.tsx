import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface Metricas {
  resumen: {
    tasaCobranza: number;
    montoTotal: number;
    pagosExitosos: number;
    clientesConMora: number;
  };
  lineaCobranza: Array<{ mes: string; porcentaje: number; }>;
  barrasBancos: Array<{ banco: string; pagos: number; }>;
  pastelEmisoras: Array<{ name: string; value: number; }>;
}

export default function DashboardPrincipal() {
  const [metricas, setMetricas] = useState<Metricas | null>(null);

  useEffect(() => {
    // Simulación de datos (en la práctica los traerías de Firebase o una API)
    const datosSimulados = {
      resumen: {
        tasaCobranza: 0.87,
        montoTotal: 520000,
        pagosExitosos: 1340,
        clientesConMora: 67
      },
      lineaCobranza: [
        { mes: "Ene", porcentaje: 0.75 },
        { mes: "Feb", porcentaje: 0.82 },
        { mes: "Mar", porcentaje: 0.87 },
        { mes: "Abr", porcentaje: 0.89 },
        { mes: "May", porcentaje: 0.91 }
      ],
      barrasBancos: [
        { banco: "Santander", pagos: 320 },
        { banco: "BBVA", pagos: 410 },
        { banco: "Banorte", pagos: 230 },
        { banco: "HSBC", pagos: 380 }
      ],
      pastelEmisoras: [
        { name: "Pemex", value: 400 },
        { name: "SEP", value: 300 },
        { name: "IMSS", value: 200 },
        { name: "ISSSTE", value: 150 }
      ]
    };
    setMetricas(datosSimulados);
  }, []);

  if (!metricas) return <div className="p-4 text-gray-600">Cargando métricas...</div>;

  return (
    <div className="p-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-xl font-bold text-gray-700">Tasa de Cobranza</h2>
          <p className="text-3xl font-semibold text-blue-600">
            {(metricas.resumen.tasaCobranza * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-xl font-bold text-gray-700">Monto Total</h2>
          <p className="text-3xl font-semibold text-green-600">
            ${metricas.resumen.montoTotal.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-xl font-bold text-gray-700">Pagos Exitosos</h2>
          <p className="text-3xl font-semibold text-indigo-600">
            {metricas.resumen.pagosExitosos}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-xl font-bold text-gray-700">Clientes con Mora</h2>
          <p className="text-3xl font-semibold text-red-500">
            {metricas.resumen.clientesConMora}
          </p>
        </div>
      </section>

      <div className="bg-white rounded-2xl p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Evolución Tasa de Cobranza
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={metricas.lineaCobranza}>
            <XAxis dataKey="mes" />
            <YAxis domain={[0, 1]} tickFormatter={(v: number) => `${v * 100}%`} />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
            <Line type="monotone" dataKey="porcentaje" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Pagos por Banco
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={metricas.barrasBancos}>
            <XAxis dataKey="banco" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pagos" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-2 bg-white rounded-2xl p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Distribución por Emisora
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={metricas.pastelEmisoras}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#6366f1"
              label
            >
              {metricas.pastelEmisoras.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#6366f1', '#f59e0b', '#10b981', '#ef4444'][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
