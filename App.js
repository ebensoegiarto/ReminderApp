import React, {useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, TextInput } from 'react-native'
import {TodosList} from './src/screens/TodosList'
import Checkbox from '@react-native-community/checkbox'

const App = () => {

  const [data, setData] = useState([{id: 1, title: 'Tugas 1', active: false}]);
  const [isModalVisible, setisModalVisible] = useState(false)
  const [title, setTitle] = useState("")

  const renderItem = ({item, index}) => {
    return(
      <View style={styles.taskItem}>
        <Checkbox disabled={false} value={item.active} onValueChange={(newValue) => setToggleCheckBox(newValue, index)} />
        <Text style={[styles.subTitle, {textDecorationLine:item.active ? 'line-through' : 'none'},]}>{item.title}</Text>
      </View>
    )
  }
  const onModal = () => {
    setisModalVisible(true)
  }

  const saveTitle = () => {
    let newArr = [...data];
    newArr.push({id: newArr.length + 1, title: title, active: false})
    setData(newArr);
  }
  const setToggleCheckBox = (value, index) => {
    let newArr = [...data]
    newArr[index].active = !newArr[index].active
    setData(newArr)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
      <Text style={styles.title}>ReminderApp</Text>
      <FlatList data={data} renderItem={renderItem}/>
      </SafeAreaView>
        <TouchableOpacity style={styles.addBtnWrapper} onPress={onModal}>
            <Image style={styles.addIcon} source={require('./assets/images/add.jpg')} />
        </TouchableOpacity>
        <Modal transparent={true} visible={isModalVisible}>
            <View style={styles.modalContentWrapper}>
                <TouchableOpacity style={styles.closeBtnWrapper} onPress={() => setisModalVisible(false)}>
                    <Image style={styles.closeIcon} source={require('./assets/images/close.png')}/>
                </TouchableOpacity>
                  <View style={styles.inputWrapper}>
                      <TextInput style={styles.textInput} placeholder={"Masukkan tugas-tugas anda"} 
                            onChangeText={(text) => setTitle(text)}/>
                        <TouchableOpacity style={styles.btnWrapper} onPress={saveTitle}> 
                            <Text style={styles.simpan}>SAVE</Text>
                        </TouchableOpacity>
                  </View>
            </View>
        </Modal>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
  },
  addIcon: {
    height: 50,
    width: 50,
  },
  addBtnWrapper: {
    alignItems: 'center',
  },
  modal: {
    height: '50%',
  },
  modalContentWrapper: {
    height: '50%',
    marginTop: 'auto',
    backgroundColor: 'green',
    padding: 15,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  closeBtnWrapper: {
    alignItems: 'flex-end',
  },
  inputWrapper: {
    marginTop: 10,
  },
  textInput: {
    padding: 15,
    backgroundColor: 'white',
    fontSize: 20,
  },
  btnWrapper: {
    backgroundColor: 'white',
    padding: 30,
    marginTop: 15,
  },
  simpan: {
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
  },
  subTitle: {
    fontSize: 20,
    marginLeft: 15,
  }
})
