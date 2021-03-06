import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'


function TeacherItem(){

    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{uri: 'https://github.com/Thauanny.png'}}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Thauanny Ramos</Text>
                    <Text style={styles.subject}>Arte</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                Casa lufa-lufa rainha o resto nadinha
                {'\n'}{'\n'}
                Web e mobile rule
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ 20,00</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        {/*<Image source={heartOutlineIcon}></Image>*/}
                        <Image source={unFavoriteIcon}></Image>
                    </RectButton>
                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon}></Image>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );

}

export default TeacherItem;