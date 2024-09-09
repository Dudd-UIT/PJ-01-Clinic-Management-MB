import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../../../assets/fonts/Fonts';
import { BCarefulTheme, style } from '../../../component/Theme';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import ImageView from 'react-native-image-viewing';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsAction } from '../../../redux/action/fetchNewsAction';

function KetQuaKhamScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const data = route.params.item;
  const ctdtById = route.params.ctdtById;
  const benhById = route.params.benhById;
  console.log('route.params', route.params);
  console.log('ctdtById', ctdtById);
  console.log('data', data);

  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const tableHeadCTDTById = [
    'Tên thuốc',
    'Liều dùng',
    'DVT',
    'SL',
    'Thành tiền',
  ];

  const tableDataCTDTById = ctdtById.map(item => [
    item.TENTHUOC,
    item.GHICHU,
    item.TENDONVI,
    item.SOLUONGTHUOC,
    item.GIABANLUCKE,
  ]);

  const widthArrCTDTById = [100, 140, 60, 60, 100];

  const tableHeadBenhById = ['Mã ICD', 'Tên bệnh'];

  const tableDataBenhById = benhById.map(item => [item.MAICD, item.TENBENH]);

  const widthArrBenhById = [100, 200];

  useEffect(() => {
    if (benhById.length > 0) {
      const {TENBENH} = benhById[0];
      dispatch(fetchNewsAction(TENBENH))
    }
  }, [benhById])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          {data?.TENLOAIDV === 'Hóa đơn thuốc' ? (
            <>
              <Text style={style.h4}>Chi tiết đơn thuốc</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.dateTime, { fontFamily: Fonts.bold }]}>
                  Thời gian tạo:{'   '}
                </Text>
                <Text style={styles.dateTime}>{data.NGAYKHAMMIN}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.content}>Kết quả khám</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.dateTime, { fontFamily: Fonts.bold }]}>
                  Thời gian khám:{'   '}
                </Text>
                <Text style={styles.dateTime}>{data.NGAYKHAMMIN}</Text>
              </View>
            </>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.dateTime, { fontFamily: Fonts.bold }]}>
              Loại dịch vụ:{'   '}
            </Text>
            <Text style={styles.dateTime}>
              {data?.TENLOAIDV || 'Dịch vụ khám'}
            </Text>
          </View>
        </View>
      </View>
      {data.TENLOAIDV === 'Hóa đơn thuốc' ? (
        <>
          <ScrollView style={styles.body}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Thông tin đơn thuốc</Text>
              <View style={styles.itemGroup}>
                <Text style={style.t1}>Người bán </Text>
                <Text style={style.t2}>{data.NGUOIBAN}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={style.t1}>Trạng thái thanh toán </Text>
                <Text style={style.t2}>{data.TTTT}</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Chi tiết đơn thuốc </Text>
              <ScrollView horizontal={true}>
                <Table
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: BCarefulTheme.colors.primary,
                  }}>
                  <Row
                    data={tableHeadCTDTById}
                    style={styles.head}
                    widthArr={widthArrCTDTById}
                    textStyle={styles.headText}
                  />
                  <TableWrapper style={styles.wrapper}>
                    <Rows
                      data={tableDataCTDTById}
                      widthArr={widthArrCTDTById}
                      textStyle={[
                        styles.text,
                        { fontFamily: Fonts.regular, textAlign: 'center' },
                      ]}
                    />
                  </TableWrapper>
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </>
      ) : data.TENLOAIDV === 'Cận lâm sàng' ? (
        <>
          <>
            <ScrollView style={styles.body}>
              <View style={styles.itemContainer}>
                <Text style={[styles.text]}>Thông tin khám</Text>
                <View style={styles.itemGroup}>
                  <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                    BSCD{'   '}
                  </Text>
                  <Text style={style.t2}>{data.INFOBSCD}</Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                    BSTH{'   '}
                  </Text>
                  <Text style={style.t2}>{data.INFOBSTH}</Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text
                    style={[
                      style.t2,
                      { fontFamily: Fonts.semiBold },
                    ]}>
                    Nội dung khám{'   '}
                  </Text>
                  <Text style={[style.t2]}>
                    {data.TENDV}
                  </Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                    Trạng thái thực hiện{'   '}
                  </Text>
                  <Text style={style.t2}>{data.TRANGTHAITH}</Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                    Trạng thái thanh toán{'   '}
                  </Text>
                  <Text style={style.t2}>{data.TTTT}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.text}>Kết quả khám</Text>
                <View style={styles.itemGroup}>
                  <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                    Mô tả{'   '}
                  </Text>
                  <Text style={style.t2}>
                    {data?.MOTA === null ? 'Chưa có' : data?.MOTA}
                  </Text>
                </View>
                <View style={styles.itemGroup}>
                  <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                    Kết luận{'   '}
                  </Text>
                  <Text style={style.t2}>
                    {data?.KETLUANCLS === null ? 'Chưa có' : data?.KETLUANCLS}{' '}
                  </Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.text}>Ảnh</Text>
                {data?.IMAGE ? (
                  <TouchableOpacity onPress={() => setIsImageViewVisible(true)}>
                    <Image
                      source={{ uri: data.IMAGE }}
                      style={{ width: '100%', height: 200 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (
                  <Text style={[style.t2, {fontFamily: Fonts.italic, color: 'red'}]}>Không có ảnh</Text>
                )}
              </View>
              <ImageView
                images={[{ uri: data.IMAGE }]}
                imageIndex={0}
                visible={isImageViewVisible}
                onRequestClose={() => setIsImageViewVisible(false)}
              />
            </ScrollView>
          </>
        </>
      ) : (
        <>
          <ScrollView style={styles.body}>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Thông tin khám</Text>
              <View style={styles.itemGroup}>
                <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                  Bác sĩ{'   '}
                </Text>
                <Text style={style.t2}>{data.INFOBS}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text
                  style={[
                    style.t2,
                    styles.itemGroupTextLeft,
                    { fontFamily: Fonts.semiBold },
                  ]}>
                  Lý do khám{'   '}
                </Text>
                <Text style={[style.t2, styles.itemGroupTextRight]}>
                  {data.LYDOKHAM}
                </Text>
              </View>
              <View style={styles.itemGroup}>
                <Text
                  style={[
                    style.t2,
                    { fontFamily: Fonts.semiBold },
                  ]}>
                  Nội dung khám{'   '}
                </Text>
                <Text style={[style.t2]}>
                  {data.TENDV}
                </Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                  Trạng thái thực hiện{'   '}
                </Text>
                <Text style={style.t2}>{data.TRANGTHAITH}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                  Trạng thái thanh toán{'   '}
                </Text>
                <Text style={style.t2}>{data.TTTT}</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Chỉ số sinh tồn</Text>
              <View style={styles.itemGroup}>
                <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                  Huyết áp{'   '}
                </Text>
                <Text style={style.t2}>{data?.HUYETAP} mmHg</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                  Chiều cao{'   '}
                </Text>
                <Text style={style.t2}>{data?.CHIEUCAO} cm</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={[style.t2, { fontFamily: Fonts.semiBold }]}>
                  Cân nặng{'   '}
                </Text>
                <Text style={style.t2}>{data?.CANNANG} kg</Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Kết quả khám</Text>
              <View style={styles.itemGroup}>
                <Text
                  style={[
                    style.t2,
                    styles.itemGroupTextLeft,
                    { fontFamily: Fonts.semiBold },
                  ]}>
                  Bệnh sử{'   '}
                </Text>
                <Text style={[style.t2, styles.itemGroupTextRight]}>
                  {data?.TRIEUCHUNGBENH}
                </Text>
              </View>
              <View style={styles.itemGroup}>
                <Text
                  style={[
                    style.t2,
                    styles.itemGroupTextLeft,
                    { fontFamily: Fonts.semiBold },
                  ]}>
                  Khám CLS{'   '}
                </Text>
                <Text style={[style.t2, styles.itemGroupTextRight]}>
                  {data?.TINHTRANGCOTHE}
                </Text>
              </View>
              <View style={[styles.itemGroup]}>
                <Text
                  style={[
                    style.t2,
                    styles.itemGroupTextLeft,
                    { fontFamily: Fonts.semiBold },
                  ]}>
                  Kết luận{'   '}
                </Text>
                <Text style={[style.t2, styles.itemGroupTextRight]}>
                  {data?.KETLUAN} Miền giá trị của một biến con trỏ là địa chỉ ô
                  nhớ
                </Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Kết luận bệnh</Text>
              <ScrollView>
                <View style={styles.tableContainer}>
                  <Table
                    borderStyle={{
                      borderWidth: 1,
                      borderColor: BCarefulTheme.colors.primary,
                    }}>
                    <Row
                      data={tableHeadBenhById}
                      style={styles.head}
                      widthArr={widthArrBenhById}
                      textStyle={styles.headText}
                    />
                    <TableWrapper style={styles.wrapper}>
                      <Rows
                        data={tableDataBenhById}
                        widthArr={widthArrBenhById}
                        textStyle={[
                          styles.text,
                          { fontFamily: Fonts.regular, textAlign: 'center' },
                        ]}
                      />
                    </TableWrapper>
                  </Table>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}

      <View style={styles.footer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#DED9FA',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  dateTime: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    fontSize: 26,
    color: '#000',
    marginLeft: 10,
  },
  body: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 10,
  },
  itemContainer: {
    borderTopWidth: 2,
    borderTopColor: BCarefulTheme.colors.primary,
    marginBottom: 10,
    paddingBottom: 10,
    borderStyle: 'dashed',
  },
  itemGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'flex-start', // Ensure items are aligned at the top
  },
  itemGroupTextLeft: {
    flex: 1,
    flexShrink: 0, // Prevent shrinking
  },
  itemGroupTextRight: {
    flex: 2, // Allow text to take up remaining space
    flexWrap: 'wrap', // Enable wrapping
    textAlign: 'left', // Optional: Align text to the right
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: BCarefulTheme.colors.primary,
  },
  head: {
    backgroundColor: '#f1f8ff',
  },
  headText: {
    margin: 6,
    fontFamily: Fonts.bold,
    color: BCarefulTheme.colors.primary,
  },
  footer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KetQuaKhamScreen;
