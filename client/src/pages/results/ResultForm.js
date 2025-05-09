// src/components/MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ResultFormData from './components/ResultFormData';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    textAlign: 'center',
  },
  heading: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  patientHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  patient_col1: {
    width: '65%',
  },
  patient_col2: {
    width: '35%',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: '10px',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 2,
    textAlign: 'center',
  },
  tableCol: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 2,
  },
  textCenter: {
    textAlign: 'center',
  },
  col1: {
    width: '40%',
  },
  col2: {
    width: '20%',
  },
  col3: {
    width: '15%',
  },
  col4: {
    width: '25%',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  tableCell: {
    fontSize: 10,
  },
  testComment: {
    fontSize: 8,
  },
  indent: {
    paddingLeft: 5,
  },
  tableColSpan: {
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 2,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerContainer: {
    width: 200,
  },
  textCenter: {
    textAlign: 'center',
  },
});

const ResultForm = ({ order }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <ResultFormData order={order} styles={styles} />
    </Page>
  </Document>
);

export default ResultForm;
