import React, {useContext, useEffect, useMemo} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Metrics, Rating, themeColors, Typograph} from 'soras-ui';
import IconBack from '../../assets/icons/Ico.Back.svg';
import IconStar from '../../assets/icons/Ico.Star.svg';
import Navigator from '../../navigation/Navigator';
import {formatCurrency} from '../../tools/currencyFormat';
import {createStyles} from './styles';
import i18n from '../../services/languageManagement/i18n';
import analytics from '@react-native-firebase/analytics';
import {Button} from '../../components/Button';
import {DatabaseContext} from '../../services/sqlite/databaseContext';

const DetailProductScreen = ({route}: {route: any}) => {
  const insets = useSafeAreaInsets();
  const product = route?.params;
  const {addProduct} = useContext(DatabaseContext)!;

  useEffect(() => {
    analytics().logScreenView({screen_name: 'DetailProductScreen'});
  }, []);

  const styles = useMemo(
    () => createStyles(Metrics, themeColors),
    [themeColors],
  );

  const handleAddProduct = async() => {
    await analytics().logEvent('added_product_to_cart', {
      product_id: product?.id,
      product_name: product?.title,
    });
    addProduct(product)
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: insets.bottom + Metrics[50],
          paddingTop: insets.top,
        }}>
        <TouchableOpacity
          onPress={() => Navigator.goBack()}
          style={{padding: Metrics[8]}}>
          <IconBack height={30} width={30} stroke={themeColors.text} />
        </TouchableOpacity>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={product?.images}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem={({item, index}) => (
            <Image
              key={index}
              source={{uri: item}}
              style={styles.image}
              width={Metrics.screenWidth}
            />
          )}
        />
        <View style={{paddingHorizontal: Metrics[16]}}>
          <Typograph customStyle={styles.price}>
            {formatCurrency('$', product?.price)}
          </Typograph>
          <Typograph customStyle={styles.title}>{product?.title}</Typograph>
        </View>
        <View style={styles.detailContainer}>
          <Typograph>{`${i18n.t('detailProductScreen.brand')} ${
            product?.brand
          }`}</Typograph>
          <Typograph>{`${i18n.t('detailProductScreen.stock')} ${
            product?.stock
          } ${i18n.t('detailProductScreen.available')}`}</Typograph>
          <Typograph>{product?.warrantyInformation}</Typograph>
          <Typograph>{product?.shippingInformation}</Typograph>
        </View>
        <View style={styles.detailContainer}>
          <Typograph>{product?.description}</Typograph>
        </View>
        <View style={{paddingHorizontal: Metrics[12]}}>
          <Typograph style={styles.reviewTitle}>
            {i18n.t('detailProductScreen.review')}
          </Typograph>
          <FlatList
            // horizontal={false}
            scrollEnabled={false}
            data={product?.reviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.reviewItem} key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: Metrics[12],
                    alignItems: 'center',
                  }}>
                  <Typograph style={styles.reviewer}>
                    {item.reviewerName}
                  </Typograph>
                  <Rating
                    value={item?.rating}
                    disable={true}
                    customIconActive={
                      <IconStar
                        fill={Colors.green}
                        stroke={Colors.green}
                        width={24}
                        height={24}
                      />
                    }
                    customIconInactive={
                      <IconStar
                        fill={'transparent'}
                        stroke={'black'}
                        width={23}
                        height={23}
                      />
                    }
                    length={1}
                    justifyContent="flex-start"
                    height={Metrics[16]}
                  />
                </View>
                <Typograph>{item.comment}</Typograph>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingBottom: insets.bottom,
          padding: Metrics[8],
          backgroundColor: themeColors.background,
        }}>
        <Button
          title={i18n.t('detailProductScreen.add_to_cart')}
          onPress={() => handleAddProduct()}
        />
      </View>
    </View>
  );
};

export default DetailProductScreen;
