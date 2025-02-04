import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { StatsContext } from '../contexts/StatsContext';

const COLORS = ['#00C49F', '#FF8042']; // Colors for valid and invalid

const ValidInvalidPieChart = () => {
    const { selectedCommune, getAggregatedStats } = useContext(StatsContext);

    const displayStats = selectedCommune || getAggregatedStats();

    const data = [
        { name: 'Validé', value: displayStats.validCount },
        { name: 'Non validé', value: displayStats.invalidCount },
    ];

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default ValidInvalidPieChart;
