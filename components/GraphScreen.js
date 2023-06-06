import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProfesseursContext from './ProfesseursContext';
import { Card } from 'react-native-elements';

function findCycles(graph) {
  const closedCycles = [];

  function dfs(node, path) {
    if (path.includes(node)) {
      const cycle = path.slice(path.indexOf(node));
      const firstNode = cycle[0];
      const lastNode = cycle[cycle.length - 1];

      const isConnected = graph.links.some(
        (link) => link.source === lastNode && link.target === firstNode
      );

      if (isConnected) {
        const cycleNodes = cycle.map((nodeId) =>
          graph.nodes.find((node) => node.id === nodeId)
        );
        const cycleString = cycleNodes
          .map((node) => `${node.nom} (${node.villeFaculteActuelle}) (${node.grade})`)
          .join(' -> ');

        if (
          !closedCycles.some(
            (existingCycle) => existingCycle.join() === cycleNodes.join()
          )
        ) {
          closedCycles.push(cycleNodes);
          console.log('Cycle fermé:', cycleString);
        }
      }

      return;
    }

    path.push(node);
    graph.links.forEach((link) => {
      if (link.source === node) {
        dfs(link.target, [...path]);
      }
    });
  }

  graph.nodes.forEach((node) => {
    let visitedNodes = [];
    let startNode = node.id;

    while (!visitedNodes.includes(startNode)) {
      visitedNodes.push(startNode);
      dfs(startNode, []);
      const lastLink = graph.links.find(
        (link) =>
          link.source === startNode &&
          !visitedNodes.includes(link.target)
      );
      if (lastLink) {
        startNode = lastLink.target;
      } else {
        break;
      }
    }
  });

  return closedCycles;
}

function findTwoNodeCycles(graph) {
  const cycles = [];

  graph.links.forEach((link) => {
    const source = link.source;
    const target = link.target;

    graph.links.forEach((innerLink) => {
      const innerSource = innerLink.source;
      const innerTarget = innerLink.target;

      if (link !== innerLink) {
        if (source === innerTarget && target === innerSource) {
          const cycleNodes = [
            graph.nodes.find((node) => node.id === source),
            graph.nodes.find((node) => node.id === target),
          ];

          if (
            !cycles.some((existingCycle) => {
              const [firstNode, secondNode] = existingCycle;
              return (
                (firstNode.id === cycleNodes[0].id &&
                  secondNode.id === cycleNodes[1].id) ||
                (firstNode.id === cycleNodes[1].id &&
                  secondNode.id === cycleNodes[0].id)
              );
            }) &&
            cycleNodes[0].id !== cycleNodes[1].id
          ) {
            cycles.push(cycleNodes);
          }
        }
      }
    });
  });

  return cycles;
}

function deduplicateCycles(cycles) {
  return cycles.filter((cycle, i) => {
    const cycleIds = cycle.map((node) => node.id).sort();
    for (let j = 0; j < i; j++) {
      const otherCycleIds = cycles[j].map((node) => node.id).sort();
      if (cycleIds.join() === otherCycleIds.join()) {
        return false;
      }
    }
    return true;
  });
}

function GraphScreen() {
  const professeurs = useContext(ProfesseursContext);
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const [closedCycles, setClosedCycles] = useState([]);

  const forceGraphRef = useRef(null);

  useEffect(() => {
    const nodes = professeurs.map((professeur, index) => ({
      id: index,
      nom: professeur.nom,
      villeFaculteActuelle: professeur.villeFaculteActuelle,
      grade: professeur.grade,
    }));

    const links = professeurs.flatMap((professeur, index) => {
      const collaborations = professeur.collaborations || [];
      return collaborations.map((collaboration) => ({
        source: index,
        target: collaboration,
      }));
    });

    setGraph({ nodes, links });
  }, [professeurs]);

  useEffect(() => {
    const cycles = findCycles(graph);
    const twoNodeCycles = findTwoNodeCycles(graph);
    const deduplicatedCycles = deduplicateCycles([
      ...cycles,
      ...twoNodeCycles,
    ]);

    setClosedCycles(deduplicatedCycles);

    if (forceGraphRef.current) {
      forceGraphRef.current.d3Force('charge').strength(-100);
      forceGraphRef.current.graphData({ nodes: graph.nodes, links: graph.links });
    }

    console.log('Cycles:', deduplicatedCycles);
  }, [graph]);

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GraphScreen;
