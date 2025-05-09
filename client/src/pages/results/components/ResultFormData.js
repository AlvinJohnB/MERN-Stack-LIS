// src/components/MyDocument.js
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import moment from 'moment';

const ResultFormData = ({ order, styles }) => (
  <>
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
          order.patient.gender === 'Male' ? test.reference_value_male : test.reference_value_female;

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
    </View>

    <View style={styles.footer} fixed={true}>
      {order?.performed_by._id === order?.released_by._id ? null : (
        <View style={styles.footerContainer}>
          <Text style={[styles.content, styles.textCenter]}>{order.performed_by.name}</Text>
          <Text style={[styles.content, styles.textCenter]}>{order.performed_by.position}</Text>
          {order.performed_by.licenseNo && order.performed_by.licenseNo === 'None' ? null : (
            <Text style={[styles.content, styles.textCenter]}>
              License No: {order.performed_by.licenseNo}
            </Text>
          )}
        </View>
      )}

      <View style={styles.footerContainer}>
        <Text style={[styles.content, styles.textCenter]}>{order.released_by.name}</Text>
        <Text style={[styles.content, styles.textCenter]}>{order.released_by.position}</Text>
        <Text style={[styles.content, styles.textCenter]}>
          License No: {order.released_by.licenseNo}
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <Text style={[styles.content, styles.textCenter]}>{order.pathologist.name}</Text>
        <Text style={[styles.content, styles.textCenter]}>{order.pathologist.position}</Text>
        <Text style={[styles.content, styles.textCenter]}>
          License No.: {order.pathologist.licenseNo}
        </Text>
      </View>
    </View>
  </>
);

export default ResultFormData;
