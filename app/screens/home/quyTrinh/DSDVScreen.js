import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCTDTByIdAction} from '../../../redux/action/fetchCTDTById';
import {fetchDsClsByIdAction} from '../../../redux/action/fetchCLSAction';
import {fetchBenhByIdAction} from '../../../redux/action/fetchBenhByIdAction';
import {
  fetchLSKByIdBnAction,
  fetchPkByIdHdAction,
} from '../../../redux/action/fetchPhieuKhamAction';
import {BCarefulTheme, style} from '../../../component/Theme';
import {fetchPhieuKhamByIdAction} from '../../../redux/action/fetchPhieuKhamByIdAction';
import {TTKICon, TTTTIcon} from '../../../component/StatusIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../../../assets/fonts/Fonts';
import {
  clearNewPKHD,
  selectItemThanhToan,
} from '../../../redux/slice/selectedItemSlice';
import axios from '../../../setup/axios';
import socket from '../../../setup/socket';

function DSDVScreen({navigation, route}) {
  console.log('ROUTE >>>>>>>>>>>>>>>> ', route);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);

  const selectedItemThanhToan = useSelector(
    state => state.selectedItem?.selectedItemThanhToan,
  );
  const selectedItem = useSelector(state => state.selectedItem?.selectedItem);

  const maPK = route.params.item ? route.params?.item.MAPK : selectedItem.MAPK;
  const maHDofPK = route.params.item
    ? route.params?.item.MAHD
    : selectedItem.MAHD;
  const NGAYKHAMMIN = route.params.item
    ? route.params?.item.NGAYKHAMMIN
    : selectedItem.NGAYKHAMMIN;

  const newPKArray = useSelector(state => state.selectedItem?.newPKArray);

  const updateHoaDon = async selectedItemThanhToan => {
    const response = await axios.post('/hoadon/thanhtoan', {
      MAHD: selectedItemThanhToan.MAHD,
      THANHTIEN: selectedItemThanhToan.THANHTIEN,
      maLT: 102,
      tttt: 'Đã thanh toán',
      tdtt: new Date(),
      pttt: 'Chuyển khoản',
    });
    if (response.status === 200) {
      // dispatch(fetchCTDTByIdAction(maPK));
      // dispatch(fetchPhieuKhamByIdAction(maPK));
      // dispatch(fetchDsClsByIdAction(maPK));
      dispatch(fetchLSKByIdBnAction(user.MABN));
      socket.emit('send-message', {actionName: 'DSHD', maID: maPK});
      socket.emit('send-message', {actionName: 'DSDK'});
      // socket.emit('send-message', {actionName: 'LSKBYIDBN', maID: user.MABN});
    }
  };

  const insertPK = async (newPKArray, maHD) => {
    const flag = await newPKArray.map(async phieuKham => {
      let ngayKham = phieuKham.ngayKham.slice(-10);
      let [day, month, year] = ngayKham.split('/').map(Number);
      let [hours, minutes] = phieuKham.gioDatLich.split(':').map(Number);
      let time = new Date(year, month - 1, day, hours);
      let bodyReq = {
        maBN: user.MABN,
        maBS: phieuKham.maBS,
        maHD: maHD,
        dichVu: phieuKham.MADV,
        ngayKham: time,
        lyDoKham: '',
        ngayDatLich: new Date(),
        gioDatLich: phieuKham.gioDatLich,
      };
      console.log('BODY REQUEST >>>>>>>>>>> ', bodyReq);
      try {
        const response2 = await axios.post(
          '/phieukham/insert-just-pk',
          bodyReq,
        );
        if (response2.status === 200) {
          // toast.success("Thêm phiếu khám thành công!!!");
          return true;
        }
      } catch (error) {
        console.log(error);
        // toast.error("Thêm phiếu khám không thành công");
      }
    });

    if (flag && flag.length !== 0) {
      for (const isComplete of flag) {
        if (isComplete === false) {
          return false;
        }
      }
      return true;
    }
  };

  const insertHDPK = async newPKArray => {
    try {
      const response1 = await axios.post('/hoadon/insert', {
        maLT: 102,
        maLHD: 1,
        tttt: 'Đã thanh toán',
        tdtt: new Date(),
        pttt: 'Chuyển khoản',
      });
      if (response1.status === 200) {
        let maHDinserted = response1.data.MAHD;
        const isComplete = await insertPK(newPKArray, maHDinserted);
        if (isComplete) {
          navigation.navigate('LichSuKham');
          dispatch(fetchLSKByIdBnAction(user.MABN));
          dispatch(clearNewPKHD());
          socket.emit('send-message', {actionName: 'DSDK'});
          socket.emit('send-message', {actionName: 'DSLH'});
        }
        // toast.success("Thêm hóa đơn thành công!!!");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Thêm hóa đơn không thành công");
    }
  };

  useEffect(() => {
    console.log('ROUTE IN USEEFFECT >>>>>>>>>>>>>>>> ', route);

    const handleOpenScreen = async () => {
      if (route && route.params.resultCode === '0' && newPKArray) {
        console.log('INSERT HDPK IS CALLED >>>>>>> ');
        await insertHDPK(newPKArray);
        return;
      } else if (route && route.params.resultCode === '0') {
        await updateHoaDon(selectedItemThanhToan);
      }

      dispatch(fetchCTDTByIdAction(maPK));
      // dispatch(fetchDSHDByIdAction(maPK));
      dispatch(fetchDsClsByIdAction(maPK));
      dispatch(fetchPkByIdHdAction(maHDofPK));
      // dispatch(fetchTTKAction(maPK));
      dispatch(fetchBenhByIdAction(maPK));
      dispatch(fetchPhieuKhamByIdAction(maPK));
    };

    handleOpenScreen();
  }, [route]);

  const ctdtById = useSelector(state => state.ctdtById.data) || [];
  console.log('ctdtById', ctdtById);
  // const hoaDon = useSelector(state => state.hoaDon.dshd) || [];
  const pkByIdHd = useSelector(state => state.dsdk.pkByIdHd) || [];
  // const ttk = useSelector(state => state.ttk.data) || [];
  const benhById = useSelector(state => state.benhById.data) || [];
  const clsById = useSelector(state => state.clsById.dsClsById) || [];
  const isLoadingCLS = useSelector(state => state.clsById.isLoading);
  const phieuKhamById = useSelector(state => state.phieuKhamById?.data) || [];
  const isLoadingPK = useSelector(state => state.isLoading?.data);
  const isLoading = isLoadingCLS && isLoadingPK;

  const phieuKhamArray = Array.isArray(phieuKhamById)
    ? phieuKhamById
    : [phieuKhamById];
  const clsByIdArray = Array.isArray(clsById) ? clsById : [clsById];

  const donThuoc = {
    TENDV: 'Đơn thuốc',
    NGAYKHAMMIN: ctdtById[0]?.THOIGIANLAP,
    TDTTMIN: ctdtById[0]?.TDTTMIN,
    TTTT: ctdtById[0]?.TTTT,
    NGUOIBAN: ctdtById[0]?.HOTEN,
    TENLOAIDV: 'Hóa đơn thuốc',
    MAHD: ctdtById[0]?.MAHD,
    THANHTIEN: ctdtById[0]?.THANHTIEN,
    TENPHONG: 'Quầy Thuốc',
    SOPHONG: 'A104',
    TANG: 1,
  };

  const data = donThuoc.MAHD
    ? [...phieuKhamArray, ...clsByIdArray, donThuoc]
    : [...phieuKhamArray, ...clsByIdArray];

  const handleThanhToan = item => {
    dispatch(selectItemThanhToan(item));
    navigation.navigate('ThanhToan', {item, ctdtById, clsByIdArray, pkByIdHd});
  };

  const phieuKhamRenderItem = ({item}) => (
    <View style={[styles.listItem]}>
      <View style={styles.bodyLeft}>
        <View style={styles.chainLeft}></View>
        <View style={styles.chain}></View>
        <View style={styles.chainRight}></View>
      </View>
      <View style={styles.bodyRight}>
        <View style={styles.timeContainer}>
          <Text style={style.t2}>
            {item.NGAYKHAMMIN ? item.NGAYKHAMMIN.split(' - ')[1] : '-- : --'}
          </Text>
        </View>
        <View style={styles.newCard}>
          {item.TRANGTHAITH && (
            <View style={styles.statusContainer}>
              <TTKICon
                style={styles.trangThaiThucHien}
                value={item.TRANGTHAITH}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('KetQuaKham', {item, ctdtById, benhById})
            }>
            <View style={styles.detailsContainer}>
              <View style={styles.row}>
                <Text style={styles.dichVuValue}>{item.TENDV}</Text>
              </View>
              {/* <Text style={[style.h4]}>{item.TENDV}</Text> */}
              {item.INFOBSCD && item.INFOBSTH ? (
                <>
                  {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[style.t3, {fontFamily: Fonts.bold}]}>
                      BSCD:{' '}
                    </Text>
                    <Text style={style.t3}>{item.INFOBSCD}</Text>
                  </View> */}
                  <View style={styles.row}>
                    <Text style={styles.label}>BSCD:</Text>
                    <Text style={styles.value}>{item.INFOBSCD}</Text>
                  </View>
                  {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[style.t3, {fontFamily: Fonts.bold}]}>
                      BSTH:{' '}
                    </Text>
                    <Text style={style.t3}>{item.INFOBSTH}</Text>
                  </View> */}
                  <View style={styles.row}>
                    <Text style={styles.label}>BSTH:</Text>
                    <Text style={styles.value}>{item.INFOBSTH}</Text>
                  </View>
                </>
              ) : item.INFOBS ? (
                // <View style={{flexDirection: 'row', alignItems: 'center'}}>
                //   <Text style={[style.t3, {fontFamily: Fonts.bold}]}>BS: </Text>
                //   <Text style={style.t3}>
                //     {item.TRINHDO} {item.TENBS}
                //   </Text>
                // </View>
                <View style={styles.row}>
                  <Text style={styles.bsLabel}>BS:</Text>
                  <Text style={styles.value}>
                    {item.TRINHDO} {item.TENBS}
                  </Text>
                </View>
              ) : item.NGUOIBAN ? (
                // <View style={{flexDirection: 'row', alignItems: 'center'}}>
                //   <Text style={[styles.doctor, {fontFamily: Fonts.bold}]}>
                //     Người bán:{' '}
                //   </Text>
                //   <Text style={styles.doctor}>{item.NGUOIBAN}</Text>
                // </View>
                <View style={styles.row}>
                  <Text style={styles.ltLabel}>Người bán:</Text>
                  <Text style={styles.value}>Lễ tân {item.NGUOIBAN}</Text>
                </View>
              ) : null}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.paidButton}
                  onPress={() => handleThanhToan(item)}>
                  <TTTTIcon value={item.TTTT} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.routeButton}
                  onPress={() => navigation.navigate('ChiDuong', {item})}>
                  <Text style={[style.t2, {fontFamily: Fonts.bold}]}>
                    Chỉ đường
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={style.h4}>Chi tiết phiếu khám</Text>
          <Text style={style.h4}>MAPK - {maPK}</Text>
          <Text style={style.h7}>{NGAYKHAMMIN}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name={'home'} style={styles.iconGoHome} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.body}>
          <FlatList data={data} renderItem={phieuKhamRenderItem} />
        </View>
      )}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={[style.t2, {fontFamily: Fonts.bold}]}>
            Hủy phiếu khám
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#6C4EF1',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  statusContainer: {
    position: 'absolute',
    top: -20,
    left: -44,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  timeContainer: {
    marginRight: 2,
    width: 44,
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
  detailsContainer: {
    flex: 1,
    // marginLeft: 10
  },
  doctor: {
    fontSize: 16,
    color: '#000',
    marginVertical: 4,
  },
  stt: {
    fontSize: 14,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 'auto',
    marginTop: 10,
    marginLeft: 20,
    minWidth: '78%',
  },
  paidButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 10,
  },
  routeButton: {
    borderColor: BCarefulTheme.colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '40%',
  },
  routeText: {
    color: BCarefulTheme.colors.primary,
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#DED9FA',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    marginLeft: 15,
  },
  iconGoHome: {
    fontSize: 26,
    color: '#000',
    marginRight: 15,
  },
  body: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  bodyLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  bodyRight: {
    flex: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tenDichVu: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    marginTop: 10,
    color: '#000',
  },
  chain: {
    borderWidth: 2,
    borderColor: 'blue',
    width: 1,
    height: 10,
    flexGrow: 1,
  },
  chainLeft: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    width: 10,
    height: 10,
  },
  chainRight: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    width: 10,
    height: 10,
  },
  footer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderColor: BCarefulTheme.colors.primary,
    backgroundColor: '#fff',
    minWidth: '44%',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#6C4EF1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: '#333333',
    flex: 0.5,
    textAlign: 'left',
  },
  bsLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: '#333333',
    flex: 0.25,
    textAlign: 'left',
  },
  ltLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: '#333333',
    flex: 1.1,
    textAlign: 'left',
  },
  value: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#000000',
    flex: 2,
    textAlign: 'left',
  },
  dichVuValue: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: '#000000',
    flex: 1,
    textAlign: 'left',
  },
});

export default DSDVScreen;
