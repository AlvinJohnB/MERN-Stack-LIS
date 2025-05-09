// src/components/MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

const ResultFooter = ({ order, styles }) => (
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
);

export default ResultFooter;
