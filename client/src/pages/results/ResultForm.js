// src/components/MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';
import ResultFooter from './components/ResultFooter';

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
      <View style={styles.section} fixed={true}>
        <Text style={styles.heading}>Lab Name</Text>
        <Text style={styles.content}>Lab Address</Text>
        <Text style={styles.content}>Lab Contact Number</Text>
        <Text style={[styles.content, styles.bold]}>Laboratory Report</Text>
      </View>

      <View style={styles.patientHeader} fixed={true}>
        <View style={styles.patient_col1}>
          <Text style={styles.content}>
            Patient Name: {order.patient.lastname}, {order.patient.firstname}{' '}
            {order.patient.middlename}{' '}
          </Text>
          <Text style={styles.content}>
            Age/Gender: {order.patient.age} {order.patient.gender}
          </Text>
          <Text style={styles.content}>
            Requesting Physician: {order.labnumber.requesting_physician}
          </Text>
          <Text style={styles.content}>
            Date Requested: {moment(order.labnumber.createdAt).format('MMMM DD, YYYY')}
          </Text>
        </View>

        <View style={styles.patient_col2}>
          <Text style={styles.content}>Date: {moment(Date.now()).format('MMMM DD, YYYY')}</Text>
          <Text style={styles.content}>Patient Type/Room No.: {order.labnumber.patient_type}</Text>
          <Text style={styles.content}>Laboratory Number: {order.labnumber.labnumber}</Text>
          <Text style={styles.content}>
            Date Released:{' '}
            {order.status === 'Released'
              ? moment(order.updatedAt).format('MMMM DD, YYYY hh:mm A')
              : 'PENDING'}{' '}
          </Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColSpan}>
            <Text style={styles.tableCellHeader}>{order.section}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableColHeader, styles.col1]}>
            <Text style={styles.tableCellHeader}>Test Name</Text>
          </View>
          <View style={[styles.tableColHeader, styles.col2]}>
            <Text style={styles.tableCellHeader}>Result</Text>
          </View>
          <View style={[styles.tableColHeader, styles.col3]}>
            <Text style={styles.tableCellHeader}>Unit</Text>
          </View>
          <View style={[styles.tableColHeader, styles.col4]}>
            <Text style={styles.tableCellHeader}>Reference</Text>
          </View>
        </View>

        {order.tests.map((testWrapper, index) => {
          const test = testWrapper.test;
          const result = testWrapper.result;
          const comment = testWrapper.test_comment;
          const reference =
            order.patient.gender === 'Male'
              ? test.reference_value_male
              : test.reference_value_female;

          if (test.package === true) {
            return (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableColSpan}>
                  <Text style={styles.tableCell}>{test.name}</Text>
                </View>
              </View>
            );
          }

          return (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCol, styles.col1]}>
                <Text style={styles.tableCell}>{test.name}</Text>
                {comment === '' ? null : (
                  <>
                    <Text style={styles.testComment}>Comment/s:</Text>
                    <Text style={[styles.testComment, styles.indent]}>{comment}</Text>
                  </>
                )}
              </View>
              <View style={[styles.tableCol, styles.col2, styles.textCenter]}>
                <Text style={styles.tableCell}>{result === '' ? 'PENDING' : result}</Text>
              </View>
              <View style={[styles.tableCol, styles.col3, styles.textCenter]}>
                <Text style={styles.tableCell}>{test.unit}</Text>
              </View>
              <View style={[styles.tableCol, styles.col4, styles.textCenter]}>
                <Text style={styles.tableCell}>{reference}</Text>
              </View>
            </View>
          );
        })}

        {/* <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Test Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Result</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Unit</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Reference</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableColSpan}>
            <Text style={styles.tableCell}>Test Name</Text>
          </View>
        </View> */}
      </View>

      <ResultFooter order={order} styles={styles} />
    </Page>
  </Document>
);

export default ResultForm;
