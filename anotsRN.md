
# -----------------------------------------INTERFACE-------------------------------------------

* Não possuem valor semanico (significado)
* Não possuem estilização propria
* todos componentes possuem por padrão  "display: flex"
* no react native não existe herança de estilos entre as tags;

* <View>    :   div, footer, header, main, aside, section
* <Text>    :   p, span, strong, h1, h2

* <FlatList/>   : coloca um scroll em interface que forem exibir lista, parecido com ScrollView;

* <SafeAreaView>    :   define uma area segura, p os components filhos serem exibidos apenas na area visivel da aplicação;

* <TouchableOpacity>    :   Botão;

# ------ estilos dos atributos de interface---------

<Statubar>  : {     //barra superior onde fica horario wifi bateria
  barstyle: define a cor dos itens da statusbar
  backgroundColor: define a cor de fundo da statusbar
}




# -----------------------------------------CONEXÃO DE IP---------------------------------------------------------

 * IOS com emulador: localhost;
 * IOS com dispositico fisico: ip da maquina
 * Android com emulador: localhost  //Porem precisa redirecionar a porta do emulador com 'adb reverse tcp:3001 tcp:3001'
 * Android com emulador: 10.0.2.2   //ip do emulador do android studio;
 * Android com emulador: 10.0.3.2   //ip do emulador geny motion;
 * Android com dispositivo fisico: IP da maquina;
 * para visualizar os log do meu app em um navegador: aperta 'windows + m' dpois aperta em 'debug' no dispositivo;



# -----------------------------------------COMANDOS---------------------------------------------------------

 * executar    :    npx react-native run-android
 * executar    :    yarn android

 * iniciando um projeto com typescript  :   npx react-native init appgobarber --template react-native-template-typescript

 * instalando styled components : yarn add styled-components
 * instalar o types para ativar o intelicence do vscode : yarn add @types/styled-components -D


 # --------------------------------------INSTALANDO ESLINT ------------------------------------


 * instalar eslint  :   yarn add eslint -D

 * iniciar eslint   :   yarn eslint --init
 * passo a passo das opçoes que devemos escolher na instalaçãp do eslint: {
     1 = To check syntax, find problems, and enforce code style;
     2 = JavaScript modules (import/export);
     3 = React;
     4 = yes;
     5 = pergunta se vc quer escolher browser ou node, é so aperta espaço;
     6 = Use a popular style guide;
     7 = Airbnb: https://github.com/airbnb/javascript;
     8 = JSON
     9 = copia as dependencias que irão ser instaladas e seleciona No;
     10 = instala as dependencias copiados como o yarn add -D
 }

  yarn add -D eslint-plugin-react@^7.21.5 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint-plugin-import@^2.22.1 eslint-plugin-jsx-a11y@^6.4.1 eslint-plugin-react-hooks@^4 || ^3 || ^2.3.0 @typescript-eslint/parser@latest

  * instalar prettier   :   yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

  * instalar dependencia    :   yarn add eslint-import-resolver-typescript -D


# -------------------------------INSTALANDO ROUTER NAVIGATOR ------------------------------------

* todos abaixo são referentes a rota de navegação:
* npm install @react-navigation/native --save
* npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view --save
* npm install @react-navigation/stack --save



# -------------------------------IMPORTANDO FONTES --------------------------------------------

* baixei uma fonte do google, coloquei as fontes na minha pasta 'assets/fonts/' criei o arquivo 'react-native.config.js' para definir a rota em que minha fontes estavam e fiz o comando 'npx react-native link' para linkar a fonte com meu projeto, para verificar se deu certo verificamos se o arquivo 'android/app/src/main/assets/fonts'  existe;


# ----------------------------------INSTALANDO ICONES--------------------------------------------

* npm i react-native-vector-icons : instalando icones

* apos instalação vamos no arquivo 'android/app/build.gradle' e adicionamos essas linhas de codigo{
  project.ext.vectoricon = [ iconFontNames = ['Father.ttf'] ]
  apply from:"../../node_modules/react-native-vector-icons/fonts.gradle";
}


# ---------------------------------INSTALANDO YUP -----------------------------------

* yarn add yup   :  `instalando dependencia de validação de form`;


# ------------------------------ INSTALANDO ASYNC-STORAGE --------------------------

* yarn add @react-native-community/async-storage    :   `dependencia que funciona como o localstorage`;




# -----------------------------------------------------------------------

* cd android && ./gradlew clean && cd .. && npx react-native run-android    :   `o app abria e ja fechava direto, nem carregava o metro bundle`
