import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
// import { PieChart } from 'react-native-svg';
import ProfesseursContext from './ProfesseursContext';
import ProgressBarWithLabel from './ProgressBar';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import _ from 'lodash';


const Dashboard = () => {
  const [specialityTableData, setSpecialityTableData] = useState([]);
  const [cityTableData, setCityTableData] = useState([]);
  const [gradeTableData, setGradeTableData] = useState([]);
  const dataP = useContext(ProfesseursContext);

  useEffect(() => {
    const countBySpeciality = () => {
      const counts = {};
      dataP.forEach((prof) => {
        counts[prof['specialite']] = (counts[prof['specialite']] || 0) + 1;
      });
      return counts;
    };

    const countByCity = () => {
      const counts = {};
      dataP.forEach((prof) => {
        const cities = prof['villeDesiree'].split(';');
        cities.forEach((city) => {
          counts[city] = (counts[city] || 0) + 1;
        });
      });
      return counts;
    };

    const countByGrade = () => {
      const counts = {};
      dataP.forEach((prof) => {
        counts[prof['grade']] = (counts[prof['grade']] || 0) + 1;
      });
      return counts;
    };

    setSpecialityTableData(
      Object.entries(countBySpeciality())
        .map(([specialite, count]) => ({ specialite, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15)
    );
    setCityTableData(
      Object.entries(countByCity())
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15)
    );
    setGradeTableData(
      Object.entries(countByGrade())
        .map(([grade, count]) => ({ grade, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15)
    );
  }, [dataP]);


//  const renderPieChart = (chartData) => {
//    const chartColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3','#F47386', '#EF1E63', '#9C2CB0', '#6E3AB7', '#3FA1B5', '#219EF3'];
//   return (
//     <View>
//       <PieChart
//         style={{ height: 200, width: 200 }}
//         data={chartData}
//         innerRadius={0}
//         outerRadius={100}
//         labelRadius={110}
//         colors={chartColors}
//       >
//         <Text />
//       </PieChart>
//       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
//         {chartData.map((data, index) => (
//           <View key={data.key} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
//             <View style={{ width: 10, height: 10, backgroundColor: chartColors[index], marginRight: 5 }} />
//             <Text>{data.key}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

const renderPieChart = (chartData) => {
  const chartColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#F47386', '#EF1E63', '#9C2CB0', '#6E3AB7', '#3FA1B5', '#219EF3'];
  const pieData = chartData.map((data, index) => ({
    value: data.value,
    key: data.key,
    svg: { fill: chartColors[index % chartColors.length] },
    arc: { outerRadius: '100%', padAngle: 0.05 },
  }));

  return (
    <ScrollView>
      <PieChart style={{ height: 200, width: 200 }} data={pieData}>
        <Text />
      </PieChart>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <View style={{ flexDirection: 'column' }}>
          {_.chunk(chartData, chartData.length).map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: 'row' }}>
              {row.map((data, index) => (
                <View key={data.key} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                  <View style={{ width: 10, height: 10, backgroundColor: chartColors[index % chartColors.length], marginRight: 5 }} />
                  <Text>{data.key}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};


  const renderDataTable = (tableData, titleKey, countKey) => (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>{titleKey}</DataTable.Title>
        <DataTable.Title>Nombre</DataTable.Title>
      </DataTable.Header>
      {tableData.map((data, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>{data[titleKey]}</DataTable.Cell>
          <DataTable.Cell>{data[countKey]}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );

  return (
    <ScrollView>
      {dataP.length > 0 ? (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Statistiques</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nombre de profs inscrits: {dataP.length}</Text>
            </View>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',  alignItems:'center', marginTop: 20, marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nombre de profs par ville (Top 15)</Text>
              {renderPieChart(cityTableData.map(data => ({ value: data.count, key: data.city })))}
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center', marginTop: 20, marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nombre de profs par spécialité (Top 15)</Text>
              {renderPieChart(specialityTableData.map(data => ({ value: data.count, key: data.specialite })))}
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center', marginTop: 20, marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nombre de profs par grade (Top 15)</Text>
              {renderPieChart(gradeTableData.map(data => ({ value: data.count, key: data.grade })))}
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nombre de profs par spécialité (Top 15)</Text>
              {renderDataTable(specialityTableData, 'specialite', 'count')}
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Villes les plus demandées (Top 15)</Text>
              {renderDataTable(cityTableData, 'city', 'count')}
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nombre de profs par grade</Text>
              {renderDataTable(gradeTableData, 'grade', 'count')}
            </View>
          </View>
        </>
      ) : (
        <ProgressBarWithLabel />
      )}
    </ScrollView>
  );
};

export default Dashboard;
