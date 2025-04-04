PGDMP  *                    }         	   bd_prueba    17.4    17.4 +    J           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            K           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            L           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            M           1262    16388 	   bd_prueba    DATABASE     o   CREATE DATABASE bd_prueba WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-CO';
    DROP DATABASE bd_prueba;
                     postgres    false            �            1259    16449    detalle_orden    TABLE     �   CREATE TABLE public.detalle_orden (
    id_detalle_orden integer NOT NULL,
    id_orden integer,
    id_producto integer,
    cantidad integer,
    precio numeric
);
 !   DROP TABLE public.detalle_orden;
       public         heap r       postgres    false            �            1259    16448 "   detalle_orden_id_detalle_orden_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_orden_id_detalle_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.detalle_orden_id_detalle_orden_seq;
       public               postgres    false    226            N           0    0 "   detalle_orden_id_detalle_orden_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.detalle_orden_id_detalle_orden_seq OWNED BY public.detalle_orden.id_detalle_orden;
          public               postgres    false    225            �            1259    16442    orden    TABLE     x   CREATE TABLE public.orden (
    id_orden integer NOT NULL,
    fecha date,
    total numeric,
    id_usuario integer
);
    DROP TABLE public.orden;
       public         heap r       postgres    false            �            1259    16441    orden_id_orden_seq    SEQUENCE     �   CREATE SEQUENCE public.orden_id_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.orden_id_orden_seq;
       public               postgres    false    224            O           0    0    orden_id_orden_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.orden_id_orden_seq OWNED BY public.orden.id_orden;
          public               postgres    false    223            �            1259    16425    producto    TABLE     x   CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre character varying(50),
    valor integer
);
    DROP TABLE public.producto;
       public         heap r       postgres    false            �            1259    16424    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public               postgres    false    222            P           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public               postgres    false    221            �            1259    16390    rol    TABLE     [   CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    nombre character varying(50)
);
    DROP TABLE public.rol;
       public         heap r       postgres    false            �            1259    16389    rol_id_rol_seq    SEQUENCE     �   CREATE SEQUENCE public.rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.rol_id_rol_seq;
       public               postgres    false    218            Q           0    0    rol_id_rol_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.rol_id_rol_seq OWNED BY public.rol.id_rol;
          public               postgres    false    217            �            1259    16397    usuario    TABLE     F  CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    primer_nombre character varying(50),
    segundo_nombre character varying(50),
    primer_apellido character varying(50),
    segundo_apellido character varying(50),
    email character varying(100),
    password character varying(250),
    id_rol integer
);
    DROP TABLE public.usuario;
       public         heap r       postgres    false            �            1259    16396    usuario_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_id_usuario_seq;
       public               postgres    false    220            R           0    0    usuario_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public               postgres    false    219            �           2604    16452    detalle_orden id_detalle_orden    DEFAULT     �   ALTER TABLE ONLY public.detalle_orden ALTER COLUMN id_detalle_orden SET DEFAULT nextval('public.detalle_orden_id_detalle_orden_seq'::regclass);
 M   ALTER TABLE public.detalle_orden ALTER COLUMN id_detalle_orden DROP DEFAULT;
       public               postgres    false    225    226    226            �           2604    16445    orden id_orden    DEFAULT     p   ALTER TABLE ONLY public.orden ALTER COLUMN id_orden SET DEFAULT nextval('public.orden_id_orden_seq'::regclass);
 =   ALTER TABLE public.orden ALTER COLUMN id_orden DROP DEFAULT;
       public               postgres    false    224    223    224            �           2604    16428    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16393 
   rol id_rol    DEFAULT     h   ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_rol_seq'::regclass);
 9   ALTER TABLE public.rol ALTER COLUMN id_rol DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    16400    usuario id_usuario    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public               postgres    false    219    220    220            G          0    16449    detalle_orden 
   TABLE DATA           b   COPY public.detalle_orden (id_detalle_orden, id_orden, id_producto, cantidad, precio) FROM stdin;
    public               postgres    false    226   1       E          0    16442    orden 
   TABLE DATA           C   COPY public.orden (id_orden, fecha, total, id_usuario) FROM stdin;
    public               postgres    false    224   91       C          0    16425    producto 
   TABLE DATA           >   COPY public.producto (id_producto, nombre, valor) FROM stdin;
    public               postgres    false    222   j1       ?          0    16390    rol 
   TABLE DATA           -   COPY public.rol (id_rol, nombre) FROM stdin;
    public               postgres    false    218   �1       A          0    16397    usuario 
   TABLE DATA           �   COPY public.usuario (id_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, password, id_rol) FROM stdin;
    public               postgres    false    220   �1       S           0    0 "   detalle_orden_id_detalle_orden_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.detalle_orden_id_detalle_orden_seq', 13, true);
          public               postgres    false    225            T           0    0    orden_id_orden_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.orden_id_orden_seq', 8, true);
          public               postgres    false    223            U           0    0    producto_id_producto_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.producto_id_producto_seq', 18, true);
          public               postgres    false    221            V           0    0    rol_id_rol_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.rol_id_rol_seq', 8, true);
          public               postgres    false    217            W           0    0    usuario_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 4, true);
          public               postgres    false    219            �           2606    16454     detalle_orden detalle_orden_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.detalle_orden
    ADD CONSTRAINT detalle_orden_pkey PRIMARY KEY (id_detalle_orden);
 J   ALTER TABLE ONLY public.detalle_orden DROP CONSTRAINT detalle_orden_pkey;
       public                 postgres    false    226            �           2606    16447    orden orden_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pkey PRIMARY KEY (id_orden);
 :   ALTER TABLE ONLY public.orden DROP CONSTRAINT orden_pkey;
       public                 postgres    false    224            �           2606    16430    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public                 postgres    false    222            �           2606    16395    rol rol_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public                 postgres    false    218            �           2606    16404    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public                 postgres    false    220            �           2606    16455    detalle_orden fk_id_orden    FK CONSTRAINT        ALTER TABLE ONLY public.detalle_orden
    ADD CONSTRAINT fk_id_orden FOREIGN KEY (id_orden) REFERENCES public.orden(id_orden);
 C   ALTER TABLE ONLY public.detalle_orden DROP CONSTRAINT fk_id_orden;
       public               postgres    false    224    226    4774            �           2606    16460    detalle_orden fk_id_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_orden
    ADD CONSTRAINT fk_id_producto FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto);
 F   ALTER TABLE ONLY public.detalle_orden DROP CONSTRAINT fk_id_producto;
       public               postgres    false    226    222    4772            �           2606    16405    usuario fk_id_rol    FK CONSTRAINT     q   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_id_rol FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol);
 ;   ALTER TABLE ONLY public.usuario DROP CONSTRAINT fk_id_rol;
       public               postgres    false    220    4768    218            �           2606    16481    orden fk_id_usuario    FK CONSTRAINT        ALTER TABLE ONLY public.orden
    ADD CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 =   ALTER TABLE ONLY public.orden DROP CONSTRAINT fk_id_usuario;
       public               postgres    false    224    4770    220            G      x�34��4��4�445 �=... &o5      E   !   x���4202�50�52�415 N#�=... AO      C       x�3��tJ�I�K�LLO�445 �=... `L+      ?      x�3�LL����2�L��L�+I����� O�      A   �   x�U�=�0 @�=G�B��
Q*
$���Ԣ���^L�.n/y�G���+J�U�u�e�g�U�����K�pR� Q�E-e�W��!x'�l�-3���m�*i8E�{�A>�b���H?��_�'�;IV?K�?M �#ݏ#;ă=j؝XQ�g�a�-���F�ڽ���	���2���!�p�!�oddG�     